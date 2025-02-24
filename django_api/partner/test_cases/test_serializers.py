from django.test import TestCase
from partner.models import Partner, PartnerTypes
from partner.serializers import PartnerTypeSerializer, PartnerSerializer
from django.utils import timezone


class PartnerTypeSerializerTestCase(TestCase):
    """
    Test case for the PartnerTypeSerializer.
    Ensures the serializer correctly represents PartnerTypes.
    """

    def test_partner_type_serializer(self):
        """
        Test that the PartnerTypeSerializer correctly serializes
        PartnerTypes.
        """
        choices = PartnerTypeSerializer.get_choices()
        expected_choices = [
            {
                "value": choice.value,
                "label": choice.label
            } for choice in PartnerTypes
        ]
        self.assertEqual(choices, expected_choices)


class PartnerSerializerTestCase(TestCase):
    """
    Test case for the PartnerSerializer.
    Ensures correct serialization of the Partner model.
    """

    def setUp(self):
        """Set up test data for Partner model."""
        self.partner = Partner.objects.create(
            trade_name="Test Trade",
            full_name="Test Full Name",
            bin="123456789",
            partner_type=PartnerTypes.COMPANY,
            legal_address="123 Legal St",
            actual_address="456 Actual St",
            phone_number="+1234567890",
            contact_person="John Doe",
            is_own=True,
            created_at=timezone.now(),
            updated_at=timezone.now(),
            version=1
        )

    def test_partner_serializer(self):
        """
        Test that the PartnerSerializer correctly serializes a Partner
        instance.
        """
        serializer = PartnerSerializer(instance=self.partner)
        expected_data = {
            "id": self.partner.id,
            "trade_name": self.partner.trade_name,
            "full_name": self.partner.full_name,
            "bin": self.partner.bin,
            "partner_type": self.partner.partner_type.value,
            "partner_type_display": self.partner.get_partner_type_display(),
            "legal_address": self.partner.legal_address,
            "actual_address": self.partner.actual_address,
            "phone_number": self.partner.phone_number,
            "contact_person": self.partner.contact_person,
            "is_own": self.partner.is_own,
            "created_at": self.partner.created_at.strftime("%Y-%m-%d"),
            "updated_at": self.partner.updated_at.strftime("%Y-%m-%d"),
            "version": self.partner.version
        }
        self.assertEqual(serializer.data, expected_data)
