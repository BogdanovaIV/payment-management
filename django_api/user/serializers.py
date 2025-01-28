from rest_framework import serializers
from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    user_full_name = serializers.ReadOnlyField(source='user.get_full_name')


    class Meta:
        model = UserProfile
        fields = [ 'id', 'username', 'checked', 'user_full_name']