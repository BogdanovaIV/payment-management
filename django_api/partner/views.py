from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from .models import Partner
from .serializers import PartnerTypeSerializer, PartnerSerializer
from .filters import PartnerFilter
from common.mixins import (
    PessimisticLockMixin,
    PessimisticLockUpdateDestroyMixin
)


class PartnerTypeChoicesView(generics.ListAPIView):
    """
    A view that returns a list of partner type choices with their values
    and labels.

    Attributes:
        queryset (list): A list of partner type choices retrieved from
        the `PartnerTypeSerializer`.
        serializer_class (PartnerTypeSerializer): The serializer used to
        serialize the partner type choices.
    """
    queryset = PartnerTypeSerializer.get_choices()
    serializer_class = PartnerTypeSerializer


class PartnerListCreateView(generics.ListCreateAPIView):
    """
    A view that supports both listing and creating Partner instances.

    Attributes:
        queryset (QuerySet): A queryset of all Partner objects, ordered
        by `trade_name`.
        serializer_class (PartnerSerializer): The serializer used to serialize
        and validate Partner instances.
        filter_backends (list): A list of filter backends used to filter
        the partner data.
        filterset_class (PartnerFilter): The filter class applied to filter
        the partner data based on the given query parameters.
    """
    permission_classes = [IsAuthenticated]
    queryset = Partner.objects.all().order_by('trade_name')
    serializer_class = PartnerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = PartnerFilter
    search_fields = [
        'trade_name',
        'bin',
    ]


class PartnerRetrieveUpdateDestroyView(PessimisticLockMixin,
                                       PessimisticLockUpdateDestroyMixin,
                                       generics.RetrieveUpdateDestroyAPIView):
    """
    A view that allows retrieving, updating, or deleting a specific Partner
    instance.

    Attributes:
        queryset (QuerySet): A queryset of all Partner objects.
        serializer_class (PartnerSerializer): The serializer used to serialize
        and validate Partner instances for retrieval, update, and deletion.
    """
    permission_classes = [IsAuthenticated]
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class PartnerLockView(generics.GenericAPIView, PessimisticLockMixin):
    """
    A view to manually lock a Partner instance.
    Ensures only authenticated users can lock a Partner instance.
    """

    permission_classes = [IsAuthenticated]
    queryset = Partner.objects.all()

    def post(self, request, pk):
        """Locks the specified Partner instance."""
        partner = get_object_or_404(Partner, pk=pk)
        return self.lock_item(request, partner)


class PartnerUnlockView(generics.GenericAPIView, PessimisticLockMixin):
    """
    A view to manually unlock a Partner instance.

    Ensures only authenticated users can unlock a Partner instance.

    Methods:
        post(request, pk):
            Unlocks the specified Partner instance if the requesting user
            holds the lock.
    """
    permission_classes = [IsAuthenticated]
    queryset = Partner.objects.all()

    def post(self, request, pk):
        """Unlocks the specified Partner instance."""
        partner = get_object_or_404(Partner, pk=pk)
        return self.unlock_item(request, partner)
