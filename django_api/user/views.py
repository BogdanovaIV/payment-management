
from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer
from django_api.permissions import IsOwnerOrAdminOrReadOnly


class UserProfileList(generics.ListAPIView):
    """Handles retrieving a list of all UserProfile instances."""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileDetail(generics.RetrieveUpdateAPIView):
    """
    Handles retrieving and updating an individual UserProfile instance.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]
