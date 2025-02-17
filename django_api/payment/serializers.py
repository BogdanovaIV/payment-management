from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from .models import PaymentRequest, PaymentRequestStatus


class PaymentRequestStatusSerializer(serializers.Serializer):
    """
    Serializer for representing payment request status.

    Attributes:
        value (IntegerField): The integer value representing
        the payment request status.
        label (CharField): The human-readable label of
        the payment request status.
    """
    value = serializers.IntegerField()
    label = serializers.CharField()

    @classmethod
    def get_choices(cls):
        """
        Retrieves all available ayment request status choices.

        Returns:
            list[dict]: A list of dictionaries with "value" and "label" keys
                        representing payment request status choices.
        """
        return [
            {
                "value": choice.value,
                "label": choice.label
            } for choice in PaymentRequestStatus
            ]


class PaymentRequestSerializer(serializers.ModelSerializer):
    """
    Serializer for the PaymentRequest model, converting model instances into
    JSON representations and including additional read-only fields for
    related objects.

    Read-Only Fields:
        - payer_trade_name (str): The trade name of the payer
        (retrieved from Partner).
        - recipient_trade_name (str): The trade name of the recipient
        (retrieved from Partner).
        - user_full_name (str): The full name of the user associated with
        the request.
        - status_display (CharField): A read-only field that returns the
        human-readable name of the payment request status
    """
    payer_trade_name = serializers.ReadOnlyField(source='payer.trade_name')
    recipient_trade_name = serializers.ReadOnlyField(
        source='recipient.trade_name'
    )
    user_full_name = serializers.ReadOnlyField(source='user.get_full_name')

    status_display = serializers.CharField(
        source='get_status_display',
        read_only=True
    )

    class Meta:
        model = PaymentRequest
        fields = [
            'id', 'created_at', 'updated_at', 'payer', 'recipient',
            'payment_priority', 'invoice_number', 'invoice_date',
            'invoice_amount', 'deadline', 'payment_amount', 'comment',
            'user', "payer_trade_name", "recipient_trade_name",
            "user_full_name", 'version', 'status', 'status_display'
        ]

    def validate_invoice_amount(self, value):
        """Ensure invoice amount is positive."""
        if value is not None and value < 0:
            raise serializers.ValidationError(
                _("Invoice amount must be a positive number.")
            )
        return value

    def validate_payment_amount(self, value):
        """Ensure payment amount is positive."""
        if value < 0:
            raise serializers.ValidationError(
                _("Payment amount must be a positive number.")
            )
        return value
