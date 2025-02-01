from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class CurrentUserSerializer(UserDetailsSerializer):
    """
    Serializer for the current user, extending from UserDetailsSerializer.

    """

    user_profile_id = serializers.ReadOnlyField(source='userprofile.id')
    full_name = serializers.ReadOnlyField(source='get_full_name')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'user_profile_id',
            'full_name',
        )


class CustomRegisterSerializer(RegisterSerializer):
    """
    Custom serializer for user registration, extending the default
    RegisterSerializer.

    Adds required fields for email, first name, and last name, ensuring they
    are included during registration.

    Fields:
        email (str): The user's email address (required).
        first_name (str): The user's first name (required).
        last_name (str): The user's last name (required).
    """

    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def save(self, request):
        """
        Saves the user with additional fields.

        Creates a new user using the validated data, assigns first name, 
        last name, and email, and then saves the user.

        Args:
            request: The HTTP request object.

        Returns:
            user: The created user instance.
        """

        user = super().save(request)

        # Add the additional fields to the user
        user.first_name = self.validated_data["first_name"]
        user.last_name = self.validated_data["last_name"]
        user.email = self.validated_data["email"]
        user.save()

        return user
