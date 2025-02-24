from django.test import TestCase
from partner.models import Partner, PartnerTypes
from partner.filters import PartnerFilter


class PartnerFilterTest(TestCase):
    """ Test cases for the PartnerFilter. """
    def setUp(self):
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

    def test_filter_by_trade_name(self):
        """
        Test that filtering by trade name (case-insensitive partial match)
        works correctly.
        """
        filter_data = {'trade_name': 'tech'}
        filtered_partners = PartnerFilter(
            filter_data,
            queryset=Partner.objects.all()
        ).qs
        self.assertIn(self.partner1, filtered_partners)
        self.assertNotIn(self.partner2, filtered_partners)

    def test_filter_by_bin(self):
        """
        Test that filtering by BIN (case-insensitive partial match) works
        correctly.
        """
        filter_data = {'bin': '987'}
        filtered_partners = PartnerFilter(
            filter_data,
            queryset=Partner.objects.all()
        ).qs
        self.assertIn(self.partner2, filtered_partners)
        self.assertNotIn(self.partner1, filtered_partners)

    def test_filter_by_partner_type(self):
        """Test that filtering by exact partner type works correctly."""
        filter_data = {'partner_type': PartnerTypes.COMPANY}
        filtered_partners = PartnerFilter(
            filter_data,
            queryset=Partner.objects.all()
        ).qs
        self.assertIn(self.partner1, filtered_partners)
        self.assertNotIn(self.partner2, filtered_partners)

    def test_filter_by_is_own(self):
        """Test that filtering by ownership status works correctly."""
        filter_data = {'is_own': True}
        filtered_partners = PartnerFilter(
            filter_data,
            queryset=Partner.objects.all()
        ).qs
        self.assertIn(self.partner1, filtered_partners)
        self.assertNotIn(self.partner2, filtered_partners)

    def test_combined_filters(self):
        """
        Test that combining multiple filters returns the correct result set.
        """
        filter_data = {'trade_name': 'innovate', 'is_own': False}
        filtered_partners = PartnerFilter(
            filter_data,
            queryset=Partner.objects.all()
        ).qs
        self.assertIn(self.partner2, filtered_partners)
        self.assertNotIn(self.partner1, filtered_partners)
