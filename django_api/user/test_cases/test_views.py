from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from user.models import UserProfile


class UserProfileAPITests(APITestCase):
    """Test suite for UserProfile API endpoints."""

    def setUp(self):
        """Set up test data before each test."""
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass"
        )
        self.other_user = User.objects.create_user(
            username="otheruser",
            password="testpass"
        )

        self.user_profile = UserProfile.objects.get(user=self.user)
        self.other_user_profile = UserProfile.objects.get(user=self.other_user)

        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_list_user_profiles(self):
        """Test retrieving a list of all user profiles."""
        url = reverse('user_profile_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 2)

    def test_retrieve_user_profile(self):
        """Test retrieving a single user profile."""
        url = reverse('user_profile_detail', args=[self.user_profile.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_own_user_profile(self):
        """Test updating the authenticated user's own profile."""
        data = {"first_nabe": "New name"}
        url = reverse('user_profile_detail', args=[self.user_profile.pk])
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_other_user_profile_fails(self):
        """Test that a user cannot update another user's profile."""
        data = {"first_nabe": "New name"}
        url = reverse('user_profile_detail', args=[self.other_user_profile.pk])
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class CustomPasswordChangeAPITests(APITestCase):
    """Test suite for the password change API."""

    def setUp(self):
        """Set up test data before each test."""
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_password_change_success(self):
        """Test successful password change."""
        data = {
            "old_password": "password123",
            "new_password1": "newsecurepassword456",
            "new_password2": "newsecurepassword456",
        }
        url = reverse('password_change')
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["detail"],
            "Password changed successfully."
        )

        # Ensure the user can log in with the new password
        self.client.logout()
        login_success = self.client.login(
            username="testuser",
            password="newsecurepassword456"
        )
        self.assertTrue(login_success)

    def test_password_change_with_wrong_old_password(self):
        """Test that password change fails if the old password is incorrect."""
        data = {
            "old_password": "wrongpassword",
            "new_password1": "newsecurepassword456",
            "new_password2": "newsecurepassword456",
        }
        url = reverse('password_change')
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("old_password", response.data)

    def test_password_change_with_invalid_new_password(self):
        """Test that password change fails if the new password is invalid."""
        data = {
            "old_password": "password123",
            "new_password1": "short",
            "new_password2": "short",
        }
        url = reverse('password_change')
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
