from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class CurrentUserSerializer(UserDetailsSerializer):
    """
    Serializer for the current user, extending from UserDetailsSerializer.

    """

    user_profile_id = serializers.ReadOnlyField(source='userprofile.id')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'user_profile_id',
        )
