from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.dateparse import parse_date
from .models import PaymentRequest
from .serializers import PaymentRequestSerializer
from .filters import PaymentRequestFilter


class PaymentRequestListCreateView(generics.ListCreateAPIView):
    """
    API view for listing and creating PaymentRequest instances.

    Features:
        - Lists all PaymentRequest records ordered by deadline.
        - Supports filtering by payer, recipient, user, invoice date, and
        deadline using DjangoFilterBackend.
        - Allows filtering by deadline range via query parameters
        (`start_deadline`, `end_deadline`).
        - Creates a new PaymentRequest instance, automatically assigning
        the requesting user as the owner.
    """
    queryset = PaymentRequest.objects.all().order_by('deadline')
    serializer_class = PaymentRequestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PaymentRequestFilter

    def get_queryset(self):
        """
        Retrieves the filtered queryset based on deadline parameters.
        
        Query Parameters:
        - start_deadline (str, optional): Filters payments with a deadline on
        or after this date (YYYY-MM-DD).
        - end_deadline (str, optional): Filters payments with a deadline on
        or before this date (YYYY-MM-DD).
        """
        queryset = super().get_queryset()

        start_deadline = self.request.GET.get("start_deadline")
        end_deadline = self.request.GET.get("end_deadline")

        start_deadline = parse_date(start_deadline) if start_deadline else None
        end_deadline = parse_date(end_deadline) if end_deadline else None

        if start_deadline and end_deadline:
            queryset = queryset.filter(
                deadline__range=[start_deadline, end_deadline]
            )
        elif start_deadline:
            queryset = queryset.filter(deadline__gte=start_deadline)
        elif end_deadline:
            queryset = queryset.filter(deadline__lte=end_deadline)

        return queryset

    def perform_create(self, serializer):
        """Saves the payment request with the requesting user as the owner."""
        serializer.save(user=self.request.user)


class PaymentRequestRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = PaymentRequest.objects.all()
    serializer_class = PaymentRequestSerializer
