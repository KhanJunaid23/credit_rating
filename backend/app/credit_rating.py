from .models import Mortgages
from django.db.models import Avg

def calculate_credit_rating(mortgage):
    risk_score = 0
    
    # Loan-to-Value (LTV) Ratio
    ltv = mortgage.loan_amount / mortgage.property_value
    if ltv > 0.90:
        risk_score += 2
    elif ltv > 0.80:
        risk_score += 1

    # Debt-to-Income (DTI) Ratio
    dti = mortgage.debt_amount / mortgage.annual_income
    if dti > 0.50:
        risk_score += 2
    elif dti > 0.40:
        risk_score += 1

    # Credit Score
    if mortgage.credit_score >= 700:
        risk_score -= 1
    elif mortgage.credit_score < 650:
        risk_score += 1

    # Loan Type
    if mortgage.loan_type == 'fixed':
        risk_score -= 1
    else:
        risk_score += 1

    # Property Type
    if mortgage.property_type == 'condo':
        risk_score += 1

    # Average Credit Score Adjustment
    avg_credit_score = Mortgages.objects.aggregate(avg_score=Avg('credit_score'))['avg_score'] or 0
    if avg_credit_score >= 700:
        risk_score -= 1
    elif avg_credit_score < 650:
        risk_score += 1

    # Assign Credit Rating
    if risk_score <= 2:
        return "AAA"
    elif 3 <= risk_score <= 5:
        return "BBB"
    else:
        return "C"
