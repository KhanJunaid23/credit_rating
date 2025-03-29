import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Mortgages
from .credit_rating import calculate_credit_rating
from .logging_config import logger

VALID_LOAN_TYPES = {"fixed", "adjustable"}
VALID_PROPERTY_TYPES = {"single_family", "condo"}

@csrf_exempt
def add_mortgage(request):
    if request.method != 'POST':
        logger.warning("Invalid HTTP method used: Expected POST")
        return JsonResponse({'error': 'Method Not Allowed'}, status=405)
    try:
        data = json.loads(request.body)
        logger.info(f"Received data: {data}")

        # Validate required fields
        required_fields = ['credit_score', 'loan_amount', 'property_value', 'annual_income', 'debt_amount', 'loan_type', 'property_type']
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            logger.warning(f"Missing fields: {missing_fields}")
            return JsonResponse({'error': f'Missing fields: {", ".join(missing_fields)}'}, status=400)

        credit_score = data['credit_score']
        if not isinstance(credit_score, int) or not (300 <= credit_score <= 850):
            logger.warning(f"Invalid credit_score: {credit_score}")
            return JsonResponse({'error': 'Invalid credit_score. Must be an integer between 300 and 850.'}, status=400)

        for field in ['loan_amount', 'property_value', 'annual_income', 'debt_amount']:
            if not isinstance(data[field], (int, float)) or data[field] <= 0:
                logger.warning(f"Invalid {field}: {data[field]}")
                return JsonResponse({'error': f'Invalid {field}. Must be a positive number.'}, status=400)

        if data['loan_type'] not in VALID_LOAN_TYPES:
            logger.warning(f"Invalid loan_type: {data['loan_type']}")
            return JsonResponse({'error': f'Invalid loan_type. Must be one of {VALID_LOAN_TYPES}.'}, status=400)

        if data['property_type'] not in VALID_PROPERTY_TYPES:
            logger.warning(f"Invalid property_type: {data['property_type']}")
            return JsonResponse({'error': f'Invalid property_type. Must be one of {VALID_PROPERTY_TYPES}.'}, status=400)

        mortgage = Mortgages.objects.create(
            credit_score=credit_score,
            loan_amount=data['loan_amount'],
            property_value=data['property_value'],
            annual_income=data['annual_income'],
            debt_amount=data['debt_amount'],
            loan_type=data['loan_type'],
            property_type=data['property_type']
        )

        mortgage.credit_rating = calculate_credit_rating(mortgage)
        mortgage.save()

        logger.info(f"Mortgage {mortgage.id} created successfully with credit rating {mortgage.credit_rating}")

        return JsonResponse({'id': mortgage.id, 'credit_rating': mortgage.credit_rating}, status=201)

    except json.JSONDecodeError:
        logger.error("Invalid JSON format in request body")
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        logger.error(f"Error processing mortgage: {str(e)}", exc_info=True)
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def get_mortgages(request):
    if request.method != 'GET':
        logger.warning("Invalid HTTP method used: Expected GET")
        return JsonResponse({'error': 'Method Not Allowed'}, status=405)
    try:
        mortgages = list(Mortgages.objects.all().values())
        if mortgages:
            logger.info(f"Retrieved {len(mortgages)} mortgage records")
        else:
            logger.warning("No mortgages found in the database")
        return JsonResponse(mortgages, safe=False, status=200)
    except Exception as e:
        logger.error(f"Error retrieving mortgages: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'Internal Server Error'}, status=500)
