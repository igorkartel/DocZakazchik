from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Copyright, Contacts
from .serializers import CopyrightSerializers, ContactsSerializers


class CombinedListAPIView(generics.ListAPIView):
    queryset = Copyright.objects.all()
    serializer_class = CopyrightSerializers


class ContactsListAPIView(generics.ListAPIView):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializers


class CombinedAPIView(APIView):
    def get(self, request):
        copyright_queryset = Copyright.objects.all()
        contacts_queryset = Contacts.objects.all()

        copyright_serializer = CopyrightSerializers(copyright_queryset, many=True)
        contacts_serializer = ContactsSerializers(contacts_queryset, many=True)

        combined_data = {
            'copyright': copyright_serializer.data,
            'contacts': contacts_serializer.data
        }

        return Response(combined_data)
