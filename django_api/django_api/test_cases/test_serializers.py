from rest_framework.test import APIRequestFactory
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from django_api.serializers import (
    CurrentUserSerializer,
    CustomRegisterSerializer
)


class CurrentUserSerializerTest(APITestCase):
    """ Test cases for the CurrentUserSerializer. """

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
        self.user.profile_id = 1

    def test_current_user_serializer(self):
        """Test that the CurrentUserSerializer includes profile_id."""
        serializer = CurrentUserSerializer(instance=self.user)
        data = serializer.data

        self.assertIn('profile_id', data)
        self.assertEqual(data['profile_id'], 1)


class CustomRegisterSerializerTest(APITestCase):
    """ Test cases for the CustomRegisterSerializer. """

    def setUp(self):
        self.factory = APIRequestFactory()
        self.valid_data = {
            "username": "testuser",
            "email": "test@example.com",
            "first_name": "John",
            "last_name": "Doe",
            "password1": "TestPassword123",
            "password2": "TestPassword123",
        }

    def test_register_serializer_valid_data(self):
        """
        Test that the registration serializer correctly validates and saves
        data.
        """
        request = self.factory.post("/")
        request.session = {}

        serializer = CustomRegisterSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

        user = serializer.save(request=request)
        self.assertEqual(user.email, self.valid_data["email"])
        self.assertEqual(user.first_name, self.valid_data["first_name"])
        self.assertEqual(user.last_name, self.valid_data["last_name"])

    def test_register_serializer_missing_fields(self):
        """
        Test that the serializer raises validation errors when required fields
        are missing.
        """
        data = {
            "username": "newuser",
            "password1": "securepassword",
            "password2": "securepassword"
        }
        serializer = CustomRegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)
        self.assertIn('first_name', serializer.errors)
        self.assertIn('last_name', serializer.errors)
