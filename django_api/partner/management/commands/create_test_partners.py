import random
from django.core.management.base import BaseCommand
from partner.models import Partner
from faker import Faker

fake = Faker()


class Command(BaseCommand):
    help = "Create 1000 test partners"

    def handle(self, *args, **kwargs):
        Partner.objects.all().delete()
        partners = []
        for _ in range(1000):
            trade_name = fake.company()
            partners.append(
                Partner(
                    trade_name=trade_name,
                    full_name=fake.company_suffix() + trade_name,
                    bin=str(fake.random_int(min=100000000, max=999999999)),
                    partner_type=random.choice([0, 1]),
                    is_own=False,
                    contact_person=fake.name(),
                    legal_address=fake.address(),
                    actual_address=fake.address(),
                    phone_number=fake.phone_number(),
                    created_at=fake.date_time_this_decade(),
                )
            )
        Partner.objects.bulk_create(partners)
        self.stdout.write(
            self.style.SUCCESS("Successfully created 1000 partners!")
        )
