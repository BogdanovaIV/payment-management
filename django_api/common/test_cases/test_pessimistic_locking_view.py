from datetime import timedelta
from django.db import models, connection
from django.contrib.auth.models import User
from django.test import TransactionTestCase, override_settings
from django.utils.timezone import now
from django.utils.translation import gettext as _
from django.shortcuts import get_object_or_404
from rest_framework.test import APIClient
from rest_framework import generics, status
from rest_framework.serializers import ModelSerializer
from common.models import LockableModel, LOCK_TIMEOUT
from common.mixins import (
    PessimisticLockMixin,
    PessimisticLockUpdateDestroyMixin
)


@override_settings(
    MIGRATION_MODULES={"common": None},
    ROOT_URLCONF='common.test_cases.test_urls'
)
class PessimisticLockTestCase(TransactionTestCase):
    """
    Test case for verifying pessimistic locking behavior in Django models.
    """
    class TestModelLocking(LockableModel, PessimisticLockMixin):
        """
        Test model implementing pessimistic locking using LockableModel.
        """
        name = models.CharField(max_length=100)

        class Meta:
            app_label = 'common'

    class TestModelLockingUpdate(
        LockableModel,
        PessimisticLockUpdateDestroyMixin
    ):
        """
        Test model that supports updates and deletion with version control.
        """
        name = models.CharField(max_length=100)

        class Meta:
            app_label = 'common'

    @classmethod
    def setUpClass(cls):
        """Set up class environment."""
        super().setUpClass()
        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(cls.TestModelLocking)
            schema_editor.create_model(cls.TestModelLockingUpdate)

    @classmethod
    def tearDownClass(cls):
        with connection.schema_editor() as schema_editor:
            schema_editor.delete_model(cls.TestModelLocking)
            schema_editor.delete_model(cls.TestModelLockingUpdate)
        super().tearDownClass()

    def setUp(self):
        """Set up test environment."""
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass"
        )
        self.other_user = User.objects.create_user(
            username="otheruser",
            password="testpass"
        )
        self.instance = self.TestModelLocking.objects.create(
            name="Test Instance"
        )
        self.update_instance = self.TestModelLockingUpdate.objects.create(
            name="Update Instance"
        )

    def test_initially_unlocked(self):
        """Test that a newly created instance is initially unlocked."""
        self.assertFalse(self.instance.is_locked())

    def test_lock_item(self):
        """Test that an authenticated user can lock an item successfully."""
        self.client.force_authenticate(user=self.user)

        response = self.client.post(f"/test-models/{self.instance.pk}/lock/")
        self.instance.refresh_from_db()

        self.assertTrue(self.instance.is_locked())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data["detail"],
            _("Item locked successfully.")
        )

    def test_unlock_item(self):
        """
        Test that an authenticated user can unlock a previously locked item.
        """
        self.client.force_authenticate(user=self.user)

        self.instance.locked_by = self.user
        self.instance.locked_at = now()
        self.instance.save()

        response = self.client.post(f"/test-models/{self.instance.pk}/unlock/")
        self.instance.refresh_from_db()

        self.assertFalse(self.instance.is_locked())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data["detail"],
            _("Item unlocked successfully.")
        )

    def test_unlock_item_by_different_user(self):
        """
        Test that a different user cannot unlock an item locked
        by someone else.
        """
        self.client.force_authenticate(user=self.other_user)

        self.instance.locked_by = self.user
        self.instance.locked_at = now()
        self.instance.save()

        response = self.client.post(f"/test-models/{self.instance.pk}/unlock/")
        self.instance.refresh_from_db()

        self.assertTrue(self.instance.is_locked())
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            response.data["detail"],
            _("You cannot unlock this item.")
        )

    def test_lock_prevents_other_users(self):
        """Test that a locked item cannot be locked by another user."""
        self.client.force_authenticate(user=self.other_user)

        self.instance.locked_by = self.user
        self.instance.locked_at = now()
        self.instance.save()

        response = self.client.post(f"/test-models/{self.instance.pk}/lock/")

        self.assertEqual(response.status_code, 423)
        self.assertIn(_("This item is locked by"), response.data["detail"])

    def test_lock_expires_after_timeout(self):
        """Test that a lock expires after the defined timeout period."""
        self.instance.locked_by = self.user
        self.instance.locked_at = now() - (LOCK_TIMEOUT + timedelta(seconds=1))
        self.instance.save()

        self.assertFalse(self.instance.is_locked())
        self.assertIsNone(self.instance.locked_by)
        self.assertIsNone(self.instance.locked_at)

    def test_update_with_correct_version(self):
        """Test updating an object with the correct version."""
        self.client.force_authenticate(user=self.user)

        # Lock the object
        self.update_instance.locked_by = self.user
        self.update_instance.locked_at = now()
        self.update_instance.save()

        url = f"/test-models/{self.update_instance.pk}/"
        payload = {
            "version": self.update_instance.version,
            "name": "Updated Name"
        }

        response = self.client.put(url, payload, format="json")

        self.update_instance.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.update_instance.name, "Updated Name")
        self.assertEqual(self.update_instance.version, 2)

    def test_update_with_stale_version(self):
        """Test updating an object with an outdated version should fail."""
        self.client.force_authenticate(user=self.user)

        url = f"/test-models/{self.update_instance.pk}/"
        payload = {
            "version": self.update_instance.version - 1,  # Stale version
            "name": "Updated Name"
        }

        response = self.client.put(url, payload, format="json")

        self.assertEqual(response.status_code, 409)  # Conflict
        self.assertIn(
            "The record has been updated by another user.",
            response.data["error"]
        )

    def test_update_without_version(self):
        """Test that updating without a version field returns an error."""
        self.client.force_authenticate(user=self.user)

        url = f"/test-models/{self.update_instance.pk}/"
        data = {"name": "Updated Name"}  # No version included
        response = self.client.put(url, data, format="json")

        self.assertEqual(response.status_code, 400)  # Bad Request
        self.assertEqual(
            response.data["error"],
            "Version is required to update the record."
        )

    def test_update_version_mismatch(self):
        """
        Test that updating with an incorrect version returns a conflict error.
        """
        self.client.force_authenticate(user=self.user)

        url = f"/test-models/{self.update_instance.pk}/"
        data = {
            "version": self.update_instance.version + 1,
            "name": "Updated Name"
        }
        response = self.client.put(url, data, format="json")

        self.assertEqual(response.status_code, 409)  # Conflict
        self.assertIn(
            "The record has been updated by another user.",
            response.data["error"]
        )

    def test_delete_unlocked_item(self):
        """Test deleting an unlocked item."""
        self.client.force_authenticate(user=self.user)

        url = f"/test-models/{self.update_instance.pk}/"
        response = self.client.delete(url)

        self.assertEqual(response.status_code, 204)  # No Content
        self.assertFalse(
            self.TestModelLockingUpdate.objects.filter(
                pk=self.update_instance.pk
            ).exists()
        )

    def test_delete_locked_item(self):
        """Test that a locked item cannot be deleted by another user."""
        self.client.force_authenticate(user=self.other_user)

        self.update_instance.locked_by = self.user
        self.update_instance.locked_at = now()
        self.update_instance.save()

        url = f"/test-models/{self.update_instance.pk}/"
        response = self.client.delete(url)

        self.assertEqual(response.status_code, 423)  # Locked
        self.assertIn("This item is locked by", response.data["detail"])


class TestModelLockingUpdateSerializer(ModelSerializer):
    """
    Serializer for TestModelLockingUpdate model.
    """
    class Meta:
        model = PessimisticLockTestCase.TestModelLockingUpdate
        fields = ['name', 'version']


class TestModelLockingUpdateView(PessimisticLockMixin,
                                 PessimisticLockUpdateDestroyMixin,
                                 generics.RetrieveUpdateDestroyAPIView):
    """
    API view to handle retrieval, updates, and deletions of locked objects.
    """
    queryset = PessimisticLockTestCase.TestModelLockingUpdate.objects.all()
    serializer_class = TestModelLockingUpdateSerializer


class TestModelLockingView(generics.GenericAPIView, PessimisticLockMixin):
    """
    API view to handle locking objects.
    """
    queryset = PessimisticLockTestCase.TestModelLocking.objects.all()

    def post(self, request, pk):
        payment_request = get_object_or_404(
            PessimisticLockTestCase.TestModelLocking,
            pk=pk
        )
        return self.lock_item(request, payment_request)


class TestModelUnLockingView(generics.GenericAPIView, PessimisticLockMixin):
    """
    API view to handle unlocking objects.
    """
    queryset = PessimisticLockTestCase.TestModelLocking.objects.all()

    def post(self, request, pk):
        payment_request = get_object_or_404(
            PessimisticLockTestCase.TestModelLocking,
            pk=pk
        )
        return self.unlock_item(request, payment_request)
