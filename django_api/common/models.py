from datetime import timedelta
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import User

LOCK_TIMEOUT = timedelta(minutes=20)


class LockableModel(models.Model):
    """
    Abstract model that provides pessimistic locking functionality
    to prevent simultaneous modifications by multiple users.

    Attributes:
        locked_by (User): A foreign key to the user who locked the instance.
                          Can be null or blank if the instance is not locked.
        locked_at (DateTimeField): The timestamp when the instance was locked.
                                    Can be null or blank if not locked.
    """
    locked_by = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    locked_at = models.DateTimeField(null=True, blank=True)
    version = models.PositiveIntegerField(null=False, blank=False, default=1)

    class Meta:
        abstract = True

    def is_locked(self):
        """
        Check if the instance is locked and if the lock has expired.

        Returns:
            bool: True if the instance is currently locked and within
                  the allowed lock duration; False otherwise.
        """
        if self.locked_by and self.locked_at:
            if now() - self.locked_at > LOCK_TIMEOUT:
                self.unlock()
                return False
            return True
        return False

    def unlock(self):
        """
        Unlock the instance by clearing the locked_by and locked_at fields.
        The instance is then saved with the updated values.
        """
        self.locked_by = None
        self.locked_at = None
        self.save(update_fields=['locked_by', 'locked_at'])
