from django.test import TestCase
from django.contrib.auth.models import User
from django.utils.timezone import now, timedelta
from django.core.exceptions import ValidationError
from partner.models import Partner
from ..models import PaymentRequest, PaymentRequestStatus


class PaymentRequestModelTestCase(TestCase):
    """Test case for the PaymentRequest model."""

    def setUp(self):
        """Set up test dependencies."""
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass"
        )
        self.payer = Partner.objects.create(
            trade_name="Payer LLC",
            full_name="Payer Company",
            bin="12345"
        )
        self.recipient = Partner.objects.create(
            trade_name="Recipient LLC",
            full_name="Recipient Company",
            bin="67890"
        )

        self.payment_request = PaymentRequest.objects.create(
            payer=self.payer,
            recipient=self.recipient,
            payment_priority=5,
            invoice_number="INV-123",
            invoice_date=now().date(),
            invoice_amount=10000,
            deadline=now().date() + timedelta(days=30),
            payment_amount=9500,
            comment="Urgent payment required.",
            user=self.user,
            status=PaymentRequestStatus.PANDING_APPROVAL
        )

    def test_payment_request_creation(self):
        """Test that a PaymentRequest instance is created successfully."""
        self.assertEqual(self.payment_request.payer, self.payer)
        self.assertEqual(self.payment_request.recipient, self.recipient)
        self.assertEqual(self.payment_request.payment_priority, 5)
        self.assertEqual(self.payment_request.invoice_number, "INV-123")
        self.assertEqual(self.payment_request.invoice_amount, 10000)
        self.assertEqual(self.payment_request.payment_amount, 9500)
        self.assertEqual(
            self.payment_request.comment,
            "Urgent payment required."
        )
        self.assertEqual(self.payment_request.user, self.user)
        self.assertEqual(
            self.payment_request.status,
            PaymentRequestStatus.PANDING_APPROVAL
        )

    def test_default_values(self):
        """Test that default values are set correctly."""
        payment = PaymentRequest.objects.create(
            payer=self.payer,
            recipient=self.recipient,
            invoice_date=now().date(),
            deadline=now().date() + timedelta(days=15),
            user=self.user
        )
        self.assertEqual(payment.payment_priority, 1)
        self.assertEqual(payment.invoice_number, "Undefined")
        self.assertEqual(payment.invoice_amount, 0)
        self.assertEqual(payment.payment_amount, 0)
        self.assertEqual(payment.status, PaymentRequestStatus.DRAFT)

    def test_payment_priority_validation(self):
        """Test that the payment_priority respects min and max values."""
        payment = PaymentRequest.objects.create(
            payer=self.payer,
            recipient=self.recipient,
            payment_priority=10,  # Max allowed value
            invoice_date=now().date(),
            deadline=now().date() + timedelta(days=20),
            user=self.user
        )
        self.assertEqual(payment.payment_priority, 10)

        # Test validation error for out-of-range values
        invalid_payment = PaymentRequest(
            payer=self.payer,
            recipient=self.recipient,
            payment_priority=11,  # Exceeds max value
            invoice_date=now().date(),
            deadline=now().date() + timedelta(days=20),
            user=self.user
        )

        with self.assertRaises(ValidationError):
            invalid_payment.full_clean()

    def test_str_method(self):
        """Test the string representation of PaymentRequest."""
        expected_str = (
            f"{self.recipient}-"
            f"{self.payment_request.payment_amount}-"
            f"{self.payment_request.deadline}"
        )
        self.assertEqual(str(self.payment_request), expected_str)
