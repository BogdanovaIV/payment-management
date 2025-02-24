from django.test import TestCase
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from user.models import UserProfile


class UserProfileTests(TestCase):
    """Test suite for the UserProfile model."""

    def setUp(self):
        """Set up test data before each test."""
        self.user = User.objects.create_user(
            username="testuser",
            password="password123"
        )

    def test_user_profile_created_on_user_creation(self):
        """
        Ensure a UserProfile is automatically created when a User is
        created.
        """
        profile = UserProfile.objects.get(user=self.user)
        self.assertIsInstance(profile, UserProfile)
        self.assertEqual(profile.user, self.user)

    def test_user_profile_default_checked_value(self):
        """Check that the default value of 'checked' is False."""
        profile = UserProfile.objects.get(user=self.user)
        self.assertFalse(profile.checked)

    def test_user_profile_string_representation(self):
        """Test the string representation of a UserProfile."""
        profile = UserProfile.objects.get(user=self.user)
        self.assertEqual(str(profile), "testuser's Profile")

    def test_user_profile_ordering(self):
        """Ensure UserProfile objects are ordered by the related user."""
        user2 = User.objects.create_user(
            username="anotheruser",
            password="password123"
        )
        profiles = UserProfile.objects.all()
        self.assertEqual(
            list(profiles),
            [self.user.userprofile, user2.userprofile]
        )


class UserProfileSignalTests(TestCase):
    """
    Test suite for the post_save signal that creates a UserProfile when
    a User is created.
    """

    def test_create_user_profile_signal(self):
        """
        Ensure a UserProfile is created via the post_save signal when a
        User is created.
        """
        new_user = User.objects.create_user(
            username="newuser",
            password="password123"
        )
        self.assertTrue(UserProfile.objects.filter(user=new_user).exists())

    def test_signal_does_not_create_duplicate_profiles(self):
        """Ensure the signal does not create duplicate UserProfiles."""
        new_user = User.objects.create_user(
            username="uniqueuser",
            password="password123"
        )

        # Manually deleting the profile to check re-creation behavior
        UserProfile.objects.filter(user=new_user).delete()

        # Trigger the signal manually
        post_save.send(sender=User, instance=new_user, created=True)

        self.assertEqual(UserProfile.objects.filter(user=new_user).count(), 1)
