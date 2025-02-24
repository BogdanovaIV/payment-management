from django.test import TestCase
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from user.models import UserProfile


class UserProfileTests(TestCase):
    """Test suite for the UserProfile model and its related functionality."""

    def setUp(self):
        """Set up test data before each test."""
        self.user = User.objects.create_user(
            username="testuser",
            password="password123"
        )

    def test_user_profile_creation(self):
        """
        Test that a UserProfile is automatically created when a new User is
        created.
        """
        profile = UserProfile.objects.get(user=self.user)
        self.assertIsInstance(profile, UserProfile)
        self.assertEqual(profile.user, self.user)
        self.assertFalse(profile.checked)

    def test_user_profile_string_representation(self):
        """Test the string representation of the UserProfile model."""
        profile = UserProfile.objects.get(user=self.user)
        self.assertEqual(str(profile), "testuser's Profile")

    def test_user_profile_defaults(self):
        """Test that a new UserProfile has the correct default values."""
        profile = UserProfile.objects.get(user=self.user)
        self.assertFalse(profile.checked)

    def test_user_profile_ordering(self):
        """Test that UserProfile objects are ordered by the user field."""
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
    Test suite for the UserProfile signal that creates profiles on user
    creation.
    """

    def test_create_user_profile_signal(self):
        """
        Test that the post_save signal creates a UserProfile when a User is
        created.
        """
        new_user = User.objects.create_user(
            username="newuser",
            password="password123"
        )
        self.assertTrue(UserProfile.objects.filter(user=new_user).exists())

    def test_signal_does_not_create_duplicate_profiles(self):
        """
        Ensure the signal does not create multiple profiles for the same user.
        """
        new_user = User.objects.create_user(
            username="uniqueuser",
            password="password123"
        )
        UserProfile.objects.filter(user=new_user).delete()

        # Manually triggering the signal
        post_save.send(sender=User, instance=new_user, created=True)

        self.assertEqual(UserProfile.objects.filter(user=new_user).count(), 1)
