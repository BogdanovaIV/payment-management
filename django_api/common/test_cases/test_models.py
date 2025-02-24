from django.test import TransactionTestCase
from django.contrib.auth.models import User
from django.utils.timezone import now
from datetime import timedelta
from django.db import models
from django.db import connection
from common.models import LockableModel, LOCK_TIMEOUT


class LockableModelTestCase(TransactionTestCase):
    """ Test cases for the LockableModel. """

    class TestModel(LockableModel):
        name = models.CharField(max_length=100)

        class Meta:
            app_label = 'common'

    @classmethod
    def setUpClass(cls):
        """Manually create the table for TestModel in the test database."""
        with connection.schema_editor() as schema_editor:
            schema_editor.create_model(cls.TestModel)

    @classmethod
    def tearDownClass(cls):
        """Manually delete the table for TestModel in the test database."""
        with connection.schema_editor() as schema_editor:
            schema_editor.delete_model(cls.TestModel)
        super().tearDownClass()

    def setUp(self):
        """Create variables for tests"""
        self.user = User.objects.create_user(
            username="testuser",
            password="password"
        )
        self.instance = self.TestModel.objects.create(name="Test Instance")

    def test_initially_unlocked(self):
        """Test that a newly created instance is not locked."""
        self.assertFalse(self.instance.is_locked())

    def test_lock_instance(self):
        """Test that an instance can be locked."""
        self.instance.locked_by = self.user
        self.instance.locked_at = now()
        self.instance.save()

        self.assertTrue(self.instance.is_locked())
        self.assertEqual(self.instance.locked_by, self.user)

    def test_unlock_instance(self):
        """Test unlocking an instance."""
        self.instance.locked_by = self.user
        self.instance.locked_at = now()
        self.instance.save()

        self.instance.unlock()

        self.assertFalse(self.instance.is_locked())
        self.assertIsNone(self.instance.locked_by)
        self.assertIsNone(self.instance.locked_at)

    def test_lock_expires_after_timeout(self):
        """Test that a lock expires after the timeout period."""
        self.instance.locked_by = self.user
        self.instance.locked_at = now() - (LOCK_TIMEOUT + timedelta(seconds=1))
        self.instance.save()

        self.assertFalse(self.instance.is_locked())
        self.assertIsNone(self.instance.locked_by)
        self.assertIsNone(self.instance.locked_at)
