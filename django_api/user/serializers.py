from rest_framework import serializers
from django.db import transaction
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserProfile model.

    Adds additional read-only fields for the user's username and full name.

    Fields:
        id (int): The primary key of the UserProfile instance.
        username (str): The username of the associated User (read-only).
        user_full_name (str): The full name of the associated User (read-only).
        checked (bool): Indicates whether the UserProfile has been checked.
    """

    id = serializers.ReadOnlyField()
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
        ]
