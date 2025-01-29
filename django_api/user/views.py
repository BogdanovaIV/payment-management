from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from django_api.permissions import IsOwnerOrAdminOrReadOnly


class UserProfileList(APIView):
    """ Handles retrieving a list of all UserProfile instances. """
    def get(self, request):
        """Returns a serialized list of all UserProfile objects."""
        profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(
            profiles,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)


class UserProfileDetail(APIView):
    """
    Handles retrieving, updating, and managing individual UserProfile
    instances.

    Attributes:
        serializer_class: The serializer used for UserProfile objects.
    """

    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def get_object(self, pk):
        """
        Retrieves a UserProfile instance by primary key or raises Http404
        if not found.
        """
        try:
            user_profile = UserProfile.objects.get(pk=pk)
            self.check_object_permissions(self.request, user_profile)
            return user_profile
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """Returns the serialized data of a specific UserProfile instance."""
        user_profile = self.get_object(pk)
        serializer = UserProfileSerializer(
            user_profile,
            context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        """Updates a UserProfile instance with the provided data if valid."""
        user_profile = self.get_object(pk)
        serializer = UserProfileSerializer(
            user_profile,
            data=request.data,
            context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
