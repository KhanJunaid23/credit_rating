from rest_framework import serializers
from .models import Mortgages

class MortgageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mortgages
        fields = '__all__'
