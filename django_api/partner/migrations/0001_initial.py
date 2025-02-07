# Generated by Django 4.2.18 on 2025-02-05 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Partner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trade_name', models.CharField(max_length=255)),
                ('full_name', models.CharField(max_length=255)),
                ('bin', models.CharField(max_length=255)),
                ('partner_type', models.IntegerField(choices=[(0, 'Company'), (1, 'Individual')], default=0)),
                ('legal_address', models.CharField(max_length=255)),
                ('actual_address', models.CharField(max_length=255)),
                ('phone_number', models.CharField(max_length=255)),
                ('contact_person', models.CharField(max_length=255)),
                ('is_own', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['trade_name'],
            },
        ),
    ]
