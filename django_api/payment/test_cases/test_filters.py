from django.test import TestCase
from django.contrib.auth.models import User
from partner.models import Partner
from payment.models import PaymentRequest
from payment.filters import PaymentRequestFilter
from django.utils.dateparse import parse_date


class PaymentRequestFilterTestCase(TestCase):
    """Test case for the PaymentRequestFilter."""

    def setUp(self):
        """Set up test data for filtering."""
        self.user1 = User.objects.create_user(
            username='user1',
            password='testpass'
        )
        self.user2 = User.objects.create_user(
            username='user2',
            password='testpass'
        )

        self.partner1 = Partner.objects.create(
            trade_name="Partner A",
            bin="123456"
        )
        self.partner2 = Partner.objects.create(
            trade_name="Partner B",
            bin="654321"
        )

        self.payment1 = PaymentRequest.objects.create(
            payer=self.partner1,
            recipient=self.partner2,
            invoice_date=parse_date("2024-01-01"),
            deadline=parse_date("2024-02-01"),
            invoice_number="INV-001",
            user=self.user1,
            status=1
        )

        self.payment2 = PaymentRequest.objects.create(
            payer=self.partner2,
            recipient=self.partner1,
            invoice_date=parse_date("2024-03-01"),
            deadline=parse_date("2024-04-01"),
            invoice_number="INV-002",
            user=self.user2,
            status=2
        )

    def test_filter_by_payer(self):
        """Test filtering by payer."""
        data = {"payer": self.partner1.id}
        filtered_qs = PaymentRequestFilter(
            data=data,
            queryset=PaymentRequest.objects.all()
        ).qs
        self.assertEqual(filtered_qs.count(), 1)
        self.assertEqual(filtered_qs.first(), self.payment1)

    def test_filter_by_recipient(self):
        """Test filtering by recipient."""
        data = {"recipient": self.partner1.id}
        filtered_qs = PaymentRequestFilter(
            data=data,
            queryset=PaymentRequest.objects.all()
        ).qs
        self.assertEqual(filtered_qs.count(), 1)
        self.assertEqual(filtered_qs.first(), self.payment2)

    def test_filter_by_invoice_date_range(self):
        """Test filtering by invoice date range."""
        data = {
            "invoice_date_after": "2024-01-01",
            "invoice_date_before": "2024-02-01"
        }
        filtered_qs = PaymentRequestFilter(
            data=data,
            queryset=PaymentRequest.objects.all()
        ).qs
        self.assertEqual(filtered_qs.count(), 1)
        self.assertEqual(filtered_qs.first(), self.payment1)

    def test_filter_by_deadline_range(self):
        """Test filtering by deadline range."""
        data = {
            "deadline_after": "2024-03-01",
            "deadline_before": "2024-05-01"
        }
        filtered_qs = PaymentRequestFilter(
            data=data,
            queryset=PaymentRequest.objects.all()
        ).qs
        self.assertEqual(filtered_qs.count(), 1)
        self.assertEqual(filtered_qs.first(), self.payment2)

    def test_filter_by_invoice_number(self):
        """Test filtering by invoice number (partial match)."""
        data = {"invoice_number": "INV-00"}
        filtered_qs = PaymentRequestFilter(
            data=data,
            queryset=PaymentRequest.objects.all()
        ).qs
        self.assertEqual(filtered_qs.count(), 2)

    def test_filter_by_user(self):
        """Test filtering by user."""
        data = {"user": self.user1.id}
        filtered_qs = PaymentRequestFilter(
            data=data,
            queryset=PaymentRequest.objects.all()
        ).qs
        self.assertEqual(filtered_qs.count(), 1)
        self.assertEqual(filtered_qs.first(), self.payment1)

    def test_filter_by_status(self):
        """Test filtering by status."""
        data = {"status": 2}
        filtered_qs = PaymentRequestFilter(
            data=data,
            queryset=PaymentRequest.objects.all()
        ).qs
        self.assertEqual(filtered_qs.count(), 1)
        self.assertEqual(filtered_qs.first(), self.payment2)
