
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_api.permissions import IsOwnerOrAdminOrReadOnly
from .models import UserProfile
from .serializers import (
    UserProfileSerializer,
    CustomPasswordChangeSerializer
)


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


class CustomPasswordChangeView(generics.UpdateAPIView):
    """
    API view for handling user password changes.

    Attributes:
        serializer_class (Serializer): The serializer used for password
        validation and updating.
        permission_classes (list): Ensures that only authenticated users
        can access this view.
    """
    serializer_class = CustomPasswordChangeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Returns the logged-in user."""
        return self.request.user

    def update(self, request, *args, **kwargs):
        """Handle password change request."""
        serializer = self.get_serializer(
            data=request.data,
            context={"request": request}
        )
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save()
        return Response(
            {"detail": "Password changed successfully."},
            status=status.HTTP_200_OK
        )
