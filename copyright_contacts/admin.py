from django.contrib import admin

from .models import Copyright, Contacts


@admin.register(Copyright)
class CopyrightAdmin(admin.ModelAdmin):
    list_display = ('site_name',
                    'owner_name',
                    'unp',
                    'country',
                    'postcode',
                    'city',
                    'street',
                    'house',
                    )
    list_display_links = ('site_name',)

@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
    list_display = ('contact_title',
                    'contact_link',
                    'contact_icon',
                    'contact_icon_adaptive',
                    )
    list_display_links = ('contact_title',)
