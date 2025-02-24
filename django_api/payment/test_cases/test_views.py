from django.contrib.auth.models import User
from django.utils.timezone import now
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from partner.models import Partner
from payment.models import PaymentRequest, PaymentRequestStatus


class PaymentRequestStatusChoicesViewTestCase(APITestCase):
    """Test case for retrieving payment request status choices."""

    def test_status_choices(self):
        """
        Tests that the API returns the correct number of status
        choices.
        """
        url = reverse("payment-request-status-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)


class PaymentRequestListCreateViewTestCase(APITestCase):
    """Test case for listing and creating PaymentRequest instances."""
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="testpass"
        )
        self.payer = Partner.objects.create(
            trade_name="Payer Ltd",
            bin="12345"
        )
        self.recipient = Partner.objects.create(
            trade_name="Recipient Ltd",
            bin="567890"
        )
        self.payment_request = PaymentRequest.objects.create(
            payer=self.payer,
            recipient=self.recipient,
            invoice_number="INV-001",
            invoice_date=now().date(),
            invoice_amount=1000,
            deadline=now().date(),
            payment_amount=900,
            status=PaymentRequestStatus.DRAFT,
            user=self.user,
        )
        self.client.force_authenticate(user=self.user)

    def test_list_payment_requests(self):
        """Tests retrieving a list of payment requests."""
        url = reverse("payment-request-list-create")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_create_payment_request(self):
        """Tests creating a new payment request."""
        url = reverse("payment-request-list-create")
        data = {
            "payer": self.payer.id,
            "recipient": self.recipient.id,
            "invoice_number": "INV-002",
            "invoice_date": now().date().strftime("%Y-%m-%d"),
            "invoice_amount": 1500,
            "deadline": now().date().strftime("%Y-%m-%d"),
            "payment_amount": 1400,
            "status": PaymentRequestStatus.DRAFT,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PaymentRequest.objects.count(), 2)


class PaymentRequestRetrieveUpdateDestroyViewTestCase(APITestCase):
    """
    Test case for retrieving, updating, and deleting a PaymentRequest
    instance.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="password"
        )
        self.payer = Partner.objects.create(
            trade_name="Payer Ltd",
            bin="12345"
        )
        self.recipient = Partner.objects.create(
            trade_name="Recipient Ltd",
            bin="567890"
        )
        self.payment_request = PaymentRequest.objects.create(
            payer=self.payer,
            recipient=self.recipient,
            invoice_number="INV-003",
            invoice_date=now().date(),
            invoice_amount=1200,
            deadline=now().date(),
            payment_amount=1100,
            status=PaymentRequestStatus.DRAFT,
            user=self.user,
        )
        self.client.force_authenticate(user=self.user)

    def test_retrieve_payment_request(self):
        """Tests retrieving a single payment request by ID."""
        url = reverse("payment-request-detail", args=[self.payment_request.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["invoice_number"], "INV-003")

    def test_update_payment_request(self):
        """Tests updating an existing payment request."""
        url = reverse("payment-request-detail", args=[self.payment_request.id])
        data = {
            "payer": self.payment_request.payer.id,
            "recipient": self.payment_request.recipient.id,
            "invoice_number": self.payment_request.invoice_number,
            "invoice_date": self.payment_request.invoice_date.strftime(
                "%Y-%m-%d"
            ),
            "invoice_amount": self.payment_request.invoice_amount,
            "deadline": self.payment_request.invoice_date.strftime("%Y-%m-%d"),
            "payment_amount": 1300,
            "status": self.payment_request.status,
            "version": self.payment_request.version,
        }
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.payment_request.refresh_from_db()
        self.assertEqual(self.payment_request.payment_amount, 1300)

    def test_delete_payment_request(self):
        """Tests deleting an existing payment request."""
        url = reverse("payment-request-detail", args=[self.payment_request.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(PaymentRequest.objects.filter(
            id=self.payment_request.id
        ).exists())


class PaymentRequestLockUnlockViewTestCase(APITestCase):
    """Test case for locking and unlocking PaymentRequest instances."""
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            password="password"
        )
        self.payer = Partner.objects.create(
            trade_name="Payer Ltd",
            bin="12345"
        )
        self.recipient = Partner.objects.create(
            trade_name="Recipient Ltd",
            bin="567890"
        )
        self.payment_request = PaymentRequest.objects.create(
            payer=self.payer,
            recipient=self.recipient,
            invoice_number="INV-004",
            invoice_date=now().date(),
            invoice_amount=1100,
            deadline=now().date(),
            payment_amount=1050,
            status=PaymentRequestStatus.DRAFT,
            user=self.user,
        )
        self.client.force_authenticate(user=self.user)

    def test_locking_payment_request(self):
        """Tests locking and unlocking a payment request."""
        url = reverse("payment-request-lock", args=[self.payment_request.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url = reverse("payment-request-unlock", args=[self.payment_request.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
