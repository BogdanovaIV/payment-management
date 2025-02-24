from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from rest_framework.permissions import SAFE_METHODS
from unittest import TestCase
from unittest.mock import Mock
from django_api.permissions import IsOwnerOrAdminOrReadOnly


class IsOwnerOrAdminOrReadOnlyTests(TestCase):
    """ Test cases for the IsOwnerOrAdminOrReadOnly. """
    def setUp(self):
        self.factory = APIRequestFactory()
        self.owner, _ = User.objects.get_or_create(username="owner")
        self.admin, _ = User.objects.get_or_create(
            username="admin",
            is_superuser=True
        )
        self.other_user, _ = User.objects.get_or_create(username="other_user")

        self.permission = IsOwnerOrAdminOrReadOnly()

        self.obj = Mock(user=self.owner)

    def test_read_access_allowed_for_anyone(self):
        """Safe methods (GET, HEAD, OPTIONS) should be allowed for any user."""
        for method in SAFE_METHODS:
            request = self.factory.get("/")
            request.user = self.other_user
            self.assertTrue(self.permission.has_object_permission(
                request,
                None,
                self.obj
            ))

    def test_owner_can_edit(self):
        """
        The owner of the object should be allowed to edit (PUT, PATCH, DELETE).
        """
        for method in ["PUT", "PATCH", "DELETE"]:
            request = self.factory.generic(method, "/")
            request.user = self.owner
            self.assertTrue(self.permission.has_object_permission(
                request,
                None,
                self.obj
            ))

    def test_admin_can_edit(self):
        """
        An admin (superuser) should be allowed to edit (PUT, PATCH, DELETE).
        """
        for method in ["PUT", "PATCH", "DELETE"]:
            request = self.factory.generic(method, "/")
            request.user = self.admin
            self.assertTrue(self.permission.has_object_permission(
                request,
                None,
                self.obj
            ))

    def test_other_users_cannot_edit(self):
        """
        Users who are neither the owner nor an admin should be denied edit
        access.
        """
        for method in ["PUT", "PATCH", "DELETE"]:
            request = self.factory.generic(method, "/")
            request.user = self.other_user
            self.assertFalse(self.permission.has_object_permission(
                request,
                None,
                self.obj
            ))
