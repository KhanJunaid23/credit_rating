# Generated by Django 5.1.7 on 2025-03-28 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mortgages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('credit_score', models.IntegerField()),
                ('loan_amount', models.FloatField()),
                ('property_value', models.FloatField()),
                ('annual_income', models.FloatField()),
                ('debt_amount', models.FloatField()),
                ('loan_type', models.CharField(choices=[('fixed', 'Fixed'), ('adjustable', 'Adjustable')], max_length=10)),
                ('property_type', models.CharField(choices=[('single_family', 'Single Family'), ('condo', 'Condo')], max_length=15)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('credit_rating', models.CharField(blank=True, max_length=3, null=True)),
            ],
            options={
                'db_table': 'mortage',
            },
        ),
    ]
