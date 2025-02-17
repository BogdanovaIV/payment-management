import django_filters
from django_filters import DateFromToRangeFilter
from django.contrib.auth.models import User
from partner.models import Partner
from .models import PaymentRequest


class PaymentRequestFilter(django_filters.FilterSet):
    """
    A filter set for filtering PaymentRequest instances.

    Filters:
        - payer (ModelChoiceFilter): Filters by the payer, selecting from
        Partner instances.
        - recipient (ModelChoiceFilter): Filters by the recipient, selecting
        from Partner instances.
        - user (ModelChoiceFilter): Filters by the user associated with the
        payment request.
        - invoice_date (DateFromToRangeFilter): Filters by the invoice date
        within a specified range.
        - deadline (DateFromToRangeFilter): Filters by the payment deadline
        within a specified range.
        - invoice_number (CharFilter): Filters by invoice number, allowing
        partial matches.
    """
    payer = django_filters.ModelChoiceFilter(
        queryset=Partner.objects.all(),
        label="Payer"
    )

    recipient = django_filters.ModelChoiceFilter(
        queryset=Partner.objects.all(),
        label="Recipient"
    )

    user = django_filters.ModelChoiceFilter(
        queryset=User.objects.all(),
        label="User"
    )

    invoice_date = DateFromToRangeFilter(
        field_name="invoice_date",
        label="Invoice Date (Period)"
    )

    deadline = DateFromToRangeFilter(
        field_name="deadline",
        label="Deadline (Period)"
    )

    invoice_number = django_filters.CharFilter(
        lookup_expr='icontains',
        required=False
    )

    status = django_filters.CharFilter(
        lookup_expr='exact',
        required=False
    )

    class Meta:
        model = PaymentRequest
        fields = ['payer',
                  'recipient',
                  'invoice_date',
                  'deadline',
                  'invoice_number',
                  'user'
                  ]
