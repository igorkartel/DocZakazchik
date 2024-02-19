from rest_framework import serializers
from .models import AboutResource, SomeFacts


class AboutResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutResource
        fields = '__all__'


class SomeFactsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SomeFacts
        fields = '__all__'
