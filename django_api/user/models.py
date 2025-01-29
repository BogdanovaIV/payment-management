from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


class UserProfile(models.Model):
    """Model representing a user profile linked to the User model.

    Attributes:
        user (OneToOneField): A unique link to a User.
        checked (BooleanField): Indicates if the profile has been verified;
        defaults to False.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    checked = models.BooleanField(default=False)

    class Meta:
        ordering = ["user"]

    def __str__(self):
        """Return a string representation of the UserProfile."""
        return f"{self.user.username}'s Profile"


def create_user_profile(sender, instance, created, **kwargs):
    """
    Creates a UserProfile instance when a new User is created.

    Args:
        sender (type): The model class sending the signal.
        instance (User): The User instance being saved.
        created (bool): True if a new User instance was created.
        **kwargs: Additional arguments.

    """
    if created:
        UserProfile.objects.create(user=instance)


post_save.connect(create_user_profile, sender=User)
