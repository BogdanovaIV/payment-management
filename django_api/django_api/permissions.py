from rest_framework import permissions


class IsOwnerOrAdminOrReadOnly(permissions.BasePermission):
    """
    Permission class that allows read-only access to all users,
    but grants write access only to the object's owner or an admin (superuser).
    """

    def has_object_permission(self, request, view, obj):
        """
        Allows read-only access for safe methods.
        Grants write access only to the object's owner or an admin.
        """

        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user or request.user.is_superuser
