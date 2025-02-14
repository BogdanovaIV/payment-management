from django.db.models.deletion import ProtectedError
from rest_framework import generics, filters, status
from rest_framework.response import Response
from django.utils.translation import gettext_lazy as _ 
from django_filters.rest_framework import DjangoFilterBackend
from .models import Partner
from .serializers import PartnerTypeSerializer, PartnerSerializer
from .filters import PartnerFilter


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
    queryset = Partner.objects.all().order_by('trade_name')
    serializer_class = PartnerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = PartnerFilter
    search_fields = [
        'trade_name',
        'bin',
    ]


class PartnerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    A view that allows retrieving, updating, or deleting a specific Partner
    instance.

    Attributes:
        queryset (QuerySet): A queryset of all Partner objects.
        serializer_class (PartnerSerializer): The serializer used to serialize
        and validate Partner instances for retrieval, update, and deletion.
    """
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            self.perform_destroy(instance)
            return Response(
                {"message": "Partner deleted successfully."},
                status=status.HTTP_204_NO_CONTENT
            )
        except ProtectedError as e:
            print(e)
            return Response(
                {
                    "error": _(
                        "Cannot delete this partner because it is referenced"
                        " in another record."
                    ),
                    "details": str(e)
                },
                status=status.HTTP_400_BAD_REQUEST
            )
