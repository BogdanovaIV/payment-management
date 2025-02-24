from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.test import APIClient
from partner.models import Partner, PartnerTypes


class PartnerAPITestCase(APITestCase):
    """Test cases for the Partner API endpoints."""
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.partner1 = Partner.objects.create(
            trade_name="TechCorp",
            bin="123456789",
            partner_type=PartnerTypes.COMPANY,
            is_own=True
        )

        self.partner2 = Partner.objects.create(
            trade_name="Innovate Solutions",
            bin="987654321",
            partner_type=PartnerTypes.INDIVIDUAL,
            is_own=False
        )

    def test_list_partners(self):
        """Ensures all partners are listed correctly."""
        url = reverse('partner-list-create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    def test_filter_partners_by_trade_name(self):
        """Checks filtering partners by trade name."""
        url = reverse('partner-list-create')
        response = self.client.get(url, {'trade_name': 'tech'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['trade_name'], "TechCorp")

    def test_retrieve_partner(self):
        """Validates retrieval of a single partner's details."""
        url = reverse('partner-detail', args=[self.partner1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['trade_name'], "TechCorp")

    def test_update_partner(self):
        """Tests updating a partner's details."""
        url = reverse('partner-detail', args=[self.partner1.id])
        response = self.client.patch(
            url,
            {
                'trade_name': 'NewTechCorp',
                'bin': self.partner1.bin,
                'partner_type': self.partner1.partner_type,
                'is_own': True,
                'version': self.partner1.version
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.partner1.refresh_from_db()
        self.assertEqual(self.partner1.trade_name, "NewTechCorp")

    def test_delete_partner(self):
        """Ensures a partner can be deleted successfully."""
        url = reverse('partner-detail', args=[self.partner1.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Partner.objects.filter(id=self.partner1.id).exists())

    def test_locking_partner(self):
        """Verifies the locking and unlocking of a partner."""
        url = reverse('partner-lock', args=[self.partner1.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url = reverse('partner-unlock', args=[self.partner1.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
