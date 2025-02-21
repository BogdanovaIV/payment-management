from rest_framework import serializers
from django.contrib.auth import password_validation
from django.utils.translation import gettext_lazy as _
from django.db import transaction
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.

    This serializer includes additional fields related to the associated User
    model, allowing controlled access to user details. It also provides
    functionality to update related user attributes within a transaction.

    Fields:
        id (int): The primary key of the UserProfile instance.
        username (str): The username of the associated User (read-only).
        first_name (str): The first name of the associated User (required).
        last_name (str): The last name of the associated User (required).
        email (str): The email of the associated User (required).
        full_name (str): The full name of the associated User (read-only).
        checked (bool): Indicates whether the UserProfile has been checked.
        is_owner (bool): Indicates whether the requesting user is the owner of
        the profile.
    """

    id = serializers.ReadOnlyField()
    user_id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.CharField(source='user.first_name', required=True)
    last_name = serializers.CharField(source='user.last_name', required=True)
    email = serializers.EmailField(source='user.email', required=True)
    is_owner = serializers.SerializerMethodField()
    full_name = serializers.ReadOnlyField(source='user.get_full_name')

    def get_is_owner(self, obj):
        """
        Determines whether the requesting user is the owner of the given
        object.

        Args:
            obj: The object being checked.

        Returns:
            bool: True if the requesting user owns the object, otherwise False.
        """

        request = self.context['request']
        return request.user == obj.user

    def update(self, instance, validated_data):
        """
        Updates the UserProfile instance along with the related User model.

        Args:
            instance (UserProfile): The existing UserProfile instance.
            validated_data (dict): The validated data for update.

        Returns:
            UserProfile: The updated UserProfile instance.
        """
        user_data = validated_data.pop("user", {})

        with transaction.atomic():
            user_profile = super().update(instance, validated_data)

            user = user_profile.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()

        return user_profile

    class Meta:
        model = UserProfile
        fields = [
            'id',
            'checked',
            'is_owner',
            'username',
            'first_name',
            'last_name',
            'email',
            'full_name',
            'user_id'
        ]


class CustomPasswordChangeSerializer(serializers.Serializer):
    """
    Serializer for handling password changes.

    Fields:
        old_password (CharField): The user's current password.
        new_password1 (CharField): The new password.
        new_password2 (CharField): Confirmation of the new password.
    """
    old_password = serializers.CharField(required=True)
    new_password1 = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate_old_password(self, value):
        """Check if the old password is correct."""
        print(value)
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                _("Your old password was entered incorrectly.")
            )
        return value

    def validate(self, data):
        """Ensure the new passwords match and are valid."""
        print(data)
        if data["new_password1"] != data["new_password2"]:
            raise serializers.ValidationError(
                {"new_password2": _("The two password fields didn’t match.")}
            )

        # Validate new password strength
        password_validation.validate_password(
            data["new_password1"],
            self.context["request"].user
        )

        return data

    def save(self, **kwargs):
        """Change the user’s password."""
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password1"])
        user.save()
        return user
