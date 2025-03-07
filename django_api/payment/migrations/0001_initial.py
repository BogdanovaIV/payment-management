# Generated by Django 4.2.18 on 2025-02-11 11:33

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('partner', '0002_alter_partner_actual_address_alter_partner_bin_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('payment_priority', models.PositiveIntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ('invoice_number', models.CharField(blank=True, max_length=50, null=True)),
                ('invoice_date', models.DateField(blank=True, null=True)),
                ('invoice_amount', models.PositiveIntegerField(default=0, null=True)),
                ('deadline', models.DateField()),
                ('payment_amount', models.PositiveIntegerField(default=0)),
                ('comment', models.TextField(blank=True, null=True)),
                ('payer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payment_requests_as_payer', to='partner.partner')),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='payment_requests_as_recipient', to='partner.partner')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['deadline'],
            },
        ),
    ]
