from django.test import TestCase
from django.db.utils import IntegrityError
from partner.models import Partner, PartnerTypes


class PartnerModelTest(TestCase):
    """ Test cases for the Partner model. """

    def setUp(self):
        self.partner = Partner.objects.create(
            trade_name="Test Trade",
            full_name="Test Full Name",
            bin="1234567890",
            partner_type=PartnerTypes.COMPANY,
            legal_address="123 Legal St",
            actual_address="456 Actual St",
            phone_number="+1234567890",
            contact_person="John Doe",
            is_own=True
        )

    def test_partner_creation(self):
        """Test that a Partner instance is created successfully."""
        self.assertEqual(self.partner.trade_name, "Test Trade")
        self.assertEqual(self.partner.full_name, "Test Full Name")
        self.assertEqual(self.partner.bin, "1234567890")
        self.assertEqual(self.partner.partner_type, PartnerTypes.COMPANY)
        self.assertEqual(self.partner.legal_address, "123 Legal St")
        self.assertEqual(self.partner.actual_address, "456 Actual St")
        self.assertEqual(self.partner.phone_number, "+1234567890")
        self.assertEqual(self.partner.contact_person, "John Doe")
        self.assertTrue(self.partner.is_own)

    def test_str_method(self):
        """Test the __str__ method returns the correct format."""
        self.assertEqual(str(self.partner), "Test Trade (1234567890)")

    def test_bin_unique_constraint(self):
        """Test that the BIN field is unique."""
        with self.assertRaises(IntegrityError):
            Partner.objects.create(
                trade_name="Duplicate BIN",
                bin="1234567890",
                partner_type=PartnerTypes.INDIVIDUAL,
                contact_person="Jane Doe"
            )

    def test_default_partner_type(self):
        """Test that the default partner type is COMPANY (0)."""
        new_partner = Partner.objects.create(
            trade_name="Default Type",
            bin="0987654321",
            contact_person="Default Person"
        )
        self.assertEqual(new_partner.partner_type, PartnerTypes.COMPANY)

    def test_contact_person_default(self):
        """Test that contact_person defaults to 'Unknown' if not provided."""
        new_partner = Partner.objects.create(
            trade_name="No Contact Person",
            bin="1112223333"
        )
        self.assertEqual(new_partner.contact_person, "Unknown")
