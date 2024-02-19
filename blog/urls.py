from django.urls import path

from .views import (BlogsSectionAPIView,
                    AllBlogsListAPIView,
                    AllBlogsTitleListAPIView,
                    ThisBlogListAPIView,
                    ThisSectionBlogsListAPIView)

urlpatterns = [
    path('blog_section/', BlogsSectionAPIView.as_view(), name='blog_section'),  # Список всех секций блога
    path('all_blog_title/', AllBlogsTitleListAPIView.as_view(), name='all_blog_title'),  # Все заголовки блогов
    path('all_blog/', AllBlogsListAPIView.as_view(), name='all_blog'),  # Все блоги
    path('this_blog/<int:blog_id>/', ThisBlogListAPIView.as_view(), name='this_blog'),  # Конкретная новость
    path('this_section_blog/<int:blog_sections_id>/', ThisSectionBlogsListAPIView.as_view(),
         name='this_section_blog'),  # Блоги определенной секции
]
