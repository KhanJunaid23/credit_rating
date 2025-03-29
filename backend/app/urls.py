from django.urls import path
from .views import add_mortgage, get_mortgages

urlpatterns = [
    path('mortgages/', get_mortgages, name="get_mortgages"),
    path('mortgages/add/', add_mortgage, name="add_mortgage"),
]
