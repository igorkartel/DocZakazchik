from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView

from .models import AboutResource, SomeFacts
from .serializers import AboutResourceSerializer, SomeFactsSerializer


class AboutResourceView(ListAPIView):
    serializer_class = AboutResourceSerializer
    queryset = AboutResource.objects.all()


class SomeFactsView(ListAPIView):
    serializer_class = SomeFactsSerializer
    queryset = SomeFacts.objects.all()
