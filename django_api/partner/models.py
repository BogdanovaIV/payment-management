from django.db import models
from django.utils.translation import gettext_lazy as _
from common.models import LockableModel


class PartnerTypes(models.IntegerChoices):
    """
    Enumeration for different types of partners.

    Attributes:
        COMPANY (int): Represents a company-type partner (0).
        INDIVIDUAL (int): Represents an individual-type partner (1).
    """
    COMPANY = 0, _('Company')
    INDIVIDUAL = 1, _('Individual')


class Partner(LockableModel):
    """
    Model representing a business partner.

    This model stores information about business partners, including
    own companies.

    Attributes:
        trade_name (CharField): The trade name of the partner.
        full_name (CharField): The full legal name of the partner (optional).
        bin (CharField): The Business Identification Number (unique).
        partner_type (IntegerField): The type of partner (Company or
        Individual).
        legal_address (TextField): The legal address of the partner (optional).
        actual_address (TextField): The actual physical address of the partner
        (optional).
        phone_number (CharField): The contact phone number (optional).
        contact_person (CharField): The contact person for the partner
        (optional).
        is_own (BooleanField): Indicates if the partner is owned by the
        company.
        created_at (DateTimeField): Timestamp when the record was created.
        updated_at (DateTimeField): Timestamp when the record was last updated.

    Meta:
        ordering (list): Orders partners by their trade name.

    Methods:
        __str__():
            Returns a string representation of the partner in the format
            "Trade Name (BIN)".
    """
    trade_name = models.CharField(
        max_length=255,
        blank=False,
        null=False,
        db_index=True
    )
    full_name = models.CharField(max_length=255, blank=True, null=True)
    bin = models.CharField(
        max_length=20,
        unique=True,
        blank=False,
        null=False,
        db_index=True)
    partner_type = models.IntegerField(
        choices=PartnerTypes.choices,
        default=0,
        null=False,
        db_index=True
    )
    legal_address = models.TextField(blank=True, null=True)
    actual_address = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    contact_person = models.CharField(
        max_length=255,
        blank=False,
        null=False,
        default="Unknown"
    )
    is_own = models.BooleanField(
        default=False,
        blank=False,
        null=False,
        db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["trade_name"]
        indexes = [
            models.Index(fields=['trade_name'], name="trade_name_idx"),
            models.Index(fields=['bin'], name="bin_idx"),
            models.Index(fields=['partner_type'], name="partner_type_idx"),
            models.Index(
                fields=['trade_name', 'is_own'],
                name="trade_name_is_own_idx"
            ),
            models.Index(
                fields=['bin', 'is_own'],
                name="bin_is_own_idx"
            ),
            models.Index(
                fields=['partner_type', 'is_own'],
                name="partner_type_is_own_idx"
            ),
            models.Index(
                fields=['trade_name', 'bin'],
                name="trade_name_bin_idx"
            ),
        ]

    def __str__(self):
        return f"{self.trade_name} ({self.bin})"
