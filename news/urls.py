from django.urls import path

from .views import (NewsSectionAPIView,
                    AllNewsListAPIView,
                    AllNewsTitleListAPIView,
                    ThisNewsListAPIView,
                    ThisSectionNewsListAPIView)

urlpatterns = [
    path('news_section/', NewsSectionAPIView.as_view(), name='news_section'),  # Список всех секций
    path('all_news_title/', AllNewsTitleListAPIView.as_view(), name='all_news_title'),  # Все заголовки новостей
    path('all_news/', AllNewsListAPIView.as_view(), name='all_news'),  # Все новости
    path('this_news/<int:news_id>/', ThisNewsListAPIView.as_view(), name='this_news'),  # Конкретная новость
    path('this_section_news/<int:news_sections_id>/', ThisSectionNewsListAPIView.as_view(),
         name='this_section_news'),  # Новости определенной секции
]
