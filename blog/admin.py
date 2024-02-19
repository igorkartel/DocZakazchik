from django.contrib import admin

from .models import BlogsSection, Blogs


@admin.register(BlogsSection)
class BlogsSectionAdmin(admin.ModelAdmin):
    list_display = ('title',)


@admin.register(Blogs)
class BlogsAdmin(admin.ModelAdmin):
    list_display = ('blog_title',
                    'blog_body',
                    'blog_sections_display',
                    'date_published',
                    )
    list_display_links = ('blog_title',)

    def blog_sections_display(self, obj):
        """ Выводит все секции для блога в стабце (Название секции) в панели администратора """
        return ", ".join([section.title for section in obj.blog_sections.all()])

    blog_sections_display.short_description = 'Cекции блогов'
