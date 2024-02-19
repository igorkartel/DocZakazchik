from django.contrib import admin

from .models import NewsSection, News


@admin.register(NewsSection)
class NewsSectionAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('news_title',
                    'news_body',
                    'news_sections_display',
                    'date_published',
                    )
    list_display_links = ('news_title',)

    def news_sections_display(self, obj):
        return ", ".join([section.title for section in obj.news_sections.all()])

    news_sections_display.short_description = 'Новостные секции'