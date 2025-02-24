from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils.timezone import now
from partner.models import Partner
from payment.models import PaymentRequest, PaymentRequestStatus
from payment.serializers import (
    PaymentRequestStatusSerializer,
    PaymentRequestSerializer
)
from rest_framework.exceptions import ValidationError

User = get_user_model()


class PaymentRequestStatusSerializerTestCase(TestCase):
    """Tests for PaymentRequestStatusSerializer"""

    def test_get_choices(self):
        """
        Test that all PaymentRequestStatus choices are serialized correctly.
        """
        expected_choices = [
            {
                "value": PaymentRequestStatus.DRAFT,
                "label": "Draft"
            },
            {
                "value": PaymentRequestStatus.PANDING_APPROVAL,
                "label": "Panding Approval"
            },
            {
                "value": PaymentRequestStatus.APPROVED,
                "label": "Approved"
            },
            {
                "value": PaymentRequestStatus.PAID,
                "label": "Paid"
            },
        ]
        self.assertEqual(
            PaymentRequestStatusSerializer.get_choices(),
            expected_choices
        )


class PaymentRequestSerializerTestCase(TestCase):
    """Tests for PaymentRequestSerializer"""

    def setUp(self):
        """Set up test data"""
        self.payer = Partner.objects.create(
            trade_name="Payer Ltd",
            bin="12345"
        )
        self.recipient = Partner.objects.create(
            trade_name="Recipient Ltd",
            bin="567890"
        )
        self.user = User.objects.create_user(
            username="testuser",
            first_name="John",
            last_name="Doe"
        )

        self.payment_request = PaymentRequest.objects.create(
            payer=self.payer,
            recipient=self.recipient,
            payment_priority=5,
            invoice_number="INV-12345",
            invoice_date=now().date(),
            invoice_amount=1000,
            deadline=now().date(),
            payment_amount=800,
            comment="Test payment",
            user=self.user,
            status=PaymentRequestStatus.APPROVED
        )

    def test_payment_request_serialization(self):
        """
        Test that PaymentRequestSerializer correctly serializes
        a PaymentRequest instance
        """
        serializer = PaymentRequestSerializer(self.payment_request)
        expected_data = {
            "id": self.payment_request.id,
            "created_at": self.payment_request.created_at.strftime("%Y-%m-%d"),
            "updated_at": self.payment_request.updated_at.strftime("%Y-%m-%d"),
            "payer": self.payer.id,
            "recipient": self.recipient.id,
            "payment_priority": 5,
            "invoice_number": "INV-12345",
            "invoice_date": self.payment_request.invoice_date.strftime(
                "%Y-%m-%d"
            ),
            "invoice_amount": 1000,
            "deadline": self.payment_request.deadline.strftime("%Y-%m-%d"),
            "payment_amount": 800,
            "comment": "Test payment",
            "user": self.user.id,
            "payer_trade_name": "Payer Ltd",
            "recipient_trade_name": "Recipient Ltd",
            "user_full_name": "John Doe",
            "status": PaymentRequestStatus.APPROVED,
            "status_display": "Approved",
            "version": 1,
        }
        self.assertEqual(serializer.data, expected_data)

    def test_invoice_amount_validation(self):
        """Test that invoice amount must be a positive number"""
        invalid_data = {
            "invoice_amount": -500
        }
        serializer = PaymentRequestSerializer(data=invalid_data)
        with self.assertRaises(ValidationError):
            serializer.validate_invoice_amount(-500)

    def test_payment_amount_validation(self):
        """Test that payment amount must be a positive number"""
        invalid_data = {
            "payment_amount": -200
        }
        serializer = PaymentRequestSerializer(data=invalid_data)
        with self.assertRaises(ValidationError):
            serializer.validate_payment_amount(-200)
