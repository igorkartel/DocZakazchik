from rest_framework import serializers

from .models import Copyright, Contacts


class CopyrightSerializers(serializers.ModelSerializer):
    class Meta:
        model = Copyright
        fields = ['site_name', 'owner_name', 'unp', 'country', 'postcode', 'city', 'street', 'house']


class ContactsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = ['contact_title', 'contact_link', 'contact_icon', 'contact_icon_adaptive']
