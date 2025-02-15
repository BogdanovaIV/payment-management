from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from .models import PaymentRequest


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
    """
    payer_trade_name = serializers.ReadOnlyField(source='payer.trade_name')
    recipient_trade_name = serializers.ReadOnlyField(
        source='recipient.trade_name'
    )
    user_full_name = serializers.ReadOnlyField(source='user.get_full_name')

    class Meta:
        model = PaymentRequest
        fields = [
            'id', 'created_at', 'updated_at', 'payer', 'recipient',
            'payment_priority', 'invoice_number', 'invoice_date',
            'invoice_amount', 'deadline', 'payment_amount', 'comment',
            'user', "payer_trade_name", "recipient_trade_name",
            "user_full_name", 'version'
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
