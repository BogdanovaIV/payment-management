from datetime import timedelta
from django.utils.timezone import now
from django.utils.translation import gettext_lazy as _
from django.db import transaction
from django.db.models.deletion import ProtectedError
from rest_framework.response import Response
from rest_framework import status
from common.models import LOCK_TIMEOUT


class PessimisticLockMixin:
    """
    A mixin to implement pessimistic locking.

    This mixin ensures that an item can be locked by a single user at a time,
    preventing concurrent modifications. It provides methods to check, lock,
    and unlock items, as well as retrieve the remaining lock time.
    """
    def get_remaining_lock_time(self, obj):
        """
        Calculates the remaining lock time for a locked object.

        Args:
            obj (Model): The object being checked.

        Returns:
            float: The remaining lock time in seconds, ensuring it does not go
            negative.
        """
        remaining_time = (obj.locked_at + LOCK_TIMEOUT) - now()
        return max(remaining_time.total_seconds(), 0)

    def lock_item(self, request, obj):
        """
        Locks an item for the requesting user.

        Args:
            request (Request): The HTTP request object.
            obj (Model): The object to be locked.

        Returns:
            Response: A success message if locking is successful,
                      or a locked status response if the item is already
                      locked.
        """
        locked = self.check_lock(request, obj)
        if locked["is_locked"]:
            return locked["response"]

        obj.locked_by = request.user
        obj.locked_at = now()
        obj.save()
        return Response({"detail": _("Item locked successfully.")})

    def unlock_item(self, request, obj):
        """
        Unlocks an item if the requesting user is the locker.

        Args:
            request (Request): The HTTP request object.
            obj (Model): The object to be unlocked.

        Returns:
            Response: A success message if unlocking is successful,
                      or an error message if the locked user isn't the user.
        """
        if obj.locked_by == request.user:
            obj.unlock()
            return Response({"detail": _("Item unlocked successfully.")})
        return Response(
            {"detail": _("You cannot unlock this item.")},
            status=status.HTTP_403_FORBIDDEN
        )

    def check_lock(self, request, obj):
        """
        Checks if the object is locked and prevents unauthorized updates.

        Args:
            request (Request): The HTTP request object.
            obj (Model): The object being checked.

        Returns:
            dict: A dictionary containing:
                - "is_locked" (bool): Whether the object is locked by another
                user.
                - "response" (Response, optional): A response if the item is
                locked.
        """
        if obj.is_locked() and obj.locked_by != request.user:
            if (now() - obj.locked_at) < LOCK_TIMEOUT:
                remaining_seconds = self.get_remaining_lock_time(obj)
                formatted_time = str(timedelta(seconds=int(remaining_seconds)))
                locked_message = _("This item is locked by")
                time_remaining_message = _("Time remaining")
                return {
                    "is_locked": True,
                    "response":
                    Response({
                            "detail":
                            f"{locked_message} "
                            f"{obj.locked_by.get_full_name()}."
                            f" {time_remaining_message}: "
                            f"{formatted_time}"
                        },
                        status=status.HTTP_423_LOCKED
                    )}
        return {"is_locked": False}


class PessimisticLockUpdateDestroyMixin:
    """
    A mixin that enforces pessimistic locking for update and delete operations.
    """
    def update(self, request, *args, **kwargs):
        """
        Updates a instance.

        If the instance is locked by another user, it prevents modification.
        """
        instance = self.get_object()
        locked = self.check_lock(request, instance)
        if locked["is_locked"]:
            return locked["response"]

        incoming_version = request.data.get("version")

        if incoming_version is None:
            return Response(
                {"error": _("Version is required to update the record.")},
                status=status.HTTP_400_BAD_REQUEST
            )

        if int(incoming_version) != instance.version:
            return Response(
                {
                    "error":
                    _("The record has been updated by another user. "
                      "Please refresh the page and try again.")
                },
                status=status.HTTP_409_CONFLICT
            )

        request.data["version"] = instance.version + 1
        with transaction.atomic():
            self.unlock_item(request, instance)
            return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Deletes a instance.

        Prevents deletion if the instance is locked. Handles cases where the
        instance is referenced by other records and cannot be deleted.
        """
        instance = self.get_object()
        locked = self.check_lock(request, instance)
        if locked["is_locked"]:
            return locked["response"]
        try:
            self.perform_destroy(instance)
            return Response(
                {"message": _("The item deleted successfully.")},
                status=status.HTTP_204_NO_CONTENT
            )
        except ProtectedError as e:
            return Response(
                {
                    "error": _(
                        "Cannot delete this item because it is referenced"
                        " in another record."
                    ),
                    "details": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )
