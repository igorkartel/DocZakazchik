from django.contrib import admin
from .models import AboutResource, SomeFacts


@admin.register(AboutResource)
class AboutResourceAdmin(admin.ModelAdmin):
    list_display = ('title',
                    'description',
                    'file',
                    'data_add_video',
                    'image',
                    )

@admin.register(SomeFacts)
class SomeFactsAdmin(admin.ModelAdmin):
    list_display = ('description',)