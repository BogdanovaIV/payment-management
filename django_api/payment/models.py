from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User
from partner.models import Partner
from common.models import LockableModel


class PaymentRequest(LockableModel):
    """
    Represents a payment request between a payer and a recipient, including
    details such as invoice information, payment amount, priority, and
    deadlines.

    Attributes:
        created_at (DateTimeField): Timestamp when the payment request was
        created.
        updated_at (DateTimeField): Timestamp when the payment request was
        last updated.
        payer (ForeignKey): The partner initiating the payment request
        (non-null).
        recipient (ForeignKey): The partner receiving the payment request
        (non-null).
        payment_priority (PositiveIntegerField): Priority level of the payment
        request (range: 1-10, default: 1).
        invoice_number (CharField): Optional invoice number (max length: 50).
        invoice_date (DateField): Optional date of the invoice.
        invoice_amount (PositiveIntegerField): Amount stated in the invoice
        (default: 0).
        deadline (DateField): Due date for the payment.
        payment_amount (PositiveIntegerField): Amount to be paid (default: 0).
        comment (TextField): Optional comments regarding the payment request.
        user (ForeignKey): The user associated with the request (nullable).
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    payer = models.ForeignKey(
        Partner,
        on_delete=models.PROTECT,
        null=False,
        related_name="payment_requests_as_payer"
    )
    recipient = models.ForeignKey(
        Partner,
        on_delete=models.PROTECT,
        null=False,
        related_name="payment_requests_as_recipient"
    )
    payment_priority = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(10)
        ],
        null=False,
        default=1
    )
    invoice_number = models.CharField(max_length=50, blank=True, null=True)
    invoice_date = models.DateField(blank=True, null=True)
    invoice_amount = models.PositiveIntegerField(null=True, default=0)
    deadline = models.DateField()
    payment_amount = models.PositiveIntegerField(null=False, default=0)
    comment = models.TextField(blank=True, null=True)
    user = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="author"
    )

    class Meta:
        ordering = ["deadline"]

    def __str__(self):
        return f"{self.recipient}-{self.payment_amount}-{self.deadline}"
