import random
from datetime import timedelta
from django.utils.timezone import now
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from partner.models import Partner
from payment.models import PaymentRequest
from faker import Faker


fake = Faker()


class Command(BaseCommand):
    help = "Create 10000 test payment requests"

    def handle(self, *args, **kwargs):
        partners = list(Partner.objects.filter(is_own=False))
        partners_own = list(Partner.objects.filter(is_own=True))
        users = list(User.objects.all())

        if not partners or not partners_own:
            self.stdout.write(
                self.style.ERROR(
                    "Not enough partners in the database to create payment"
                    " requests!"
                )
            )
            return

        payment_requests = []
        for _ in range(10000):
            payer = random.choice(partners_own)
            recipient = random.choice(partners)
            invoice_date = fake.date_between(
                start_date="-1y",
                end_date="today"
            )
            deadline = invoice_date + timedelta(days=random.randint(5, 60))
            payment_requests.append(
                PaymentRequest(
                    payer=payer,
                    recipient=recipient,
                    payment_priority=random.randint(1, 10),
                    invoice_number=fake.uuid4()[:10].upper(),
                    invoice_date=invoice_date,
                    invoice_amount=random.randint(1000, 50000),
                    deadline=deadline,
                    payment_amount=random.randint(500, 45000),
                    comment=fake.sentence(),
                    user=random.choice(users) if users else None,
                    created_at=now(),
                    status=random.choice([0, 3])
                )
            )
        PaymentRequest.objects.bulk_create(payment_requests)
        self.stdout.write(
            self.style.SUCCESS(
                "Successfully created 10000 payment requests!"
            )
        )
