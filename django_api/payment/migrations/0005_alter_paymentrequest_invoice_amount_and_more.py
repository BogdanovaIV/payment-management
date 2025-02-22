# Generated by Django 4.2.18 on 2025-02-22 04:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('payment', '0004_paymentrequest_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paymentrequest',
            name='invoice_amount',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='paymentrequest',
            name='invoice_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='paymentrequest',
            name='invoice_number',
            field=models.CharField(default='Undefined', max_length=50),
        ),
        migrations.AlterField(
            model_name='paymentrequest',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, related_name='author', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['payer'], name='payer_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['recipient'], name='recipient_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['invoice_number'], name='invoice_number_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['invoice_date'], name='invoice_date_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['deadline'], name='deadline_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['user'], name='user_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['status'], name='status_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['user', 'status'], name='user_status_idx'),
        ),
        migrations.AddIndex(
            model_name='paymentrequest',
            index=models.Index(fields=['payer', 'recipient'], name='payer_recipient_idx'),
        ),
    ]
