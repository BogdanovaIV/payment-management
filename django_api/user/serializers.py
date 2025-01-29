from rest_framework import serializers
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

    username = serializers.ReadOnlyField(source='user.username')
    user_full_name = serializers.ReadOnlyField(source='user.get_full_name')

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'checked', 'user_full_name']
