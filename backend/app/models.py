from django.db import models

# Create your models here.

class Mortgages(models.Model):
    LOAN_TYPES = [('fixed', 'Fixed'), ('adjustable', 'Adjustable')]
    PROPERTY_TYPES = [('single_family', 'Single Family'), ('condo', 'Condo')]

    credit_score = models.IntegerField()
    loan_amount = models.FloatField()
    property_value = models.FloatField()
    annual_income = models.FloatField()
    debt_amount = models.FloatField()
    loan_type = models.CharField(max_length=10, choices=LOAN_TYPES)
    property_type = models.CharField(max_length=15, choices=PROPERTY_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    credit_rating = models.CharField(max_length=3, null=True, blank=True)

    class Meta:
        db_table = "mortage"

    def __str__(self):
        return f"Mortgage {self.id} - {self.credit_rating}"
