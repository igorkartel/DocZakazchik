from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .filters import BlogsFilter
from .models import BlogsSection, Blogs
from .serializers import BlogsSectionSerializer, BlogsSerializer, AllBlogsTitleSerializer


class BlogsSectionAPIView(generics.ListAPIView):
    """ Выводим все секций блогов """
    queryset = BlogsSection.objects.all()
    serializer_class = BlogsSectionSerializer


class AllBlogsTitleListAPIView(generics.ListAPIView):
    """ Выводим заголовки блогов """
    queryset = Blogs.objects.prefetch_related('blog_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = AllBlogsTitleSerializer
    pagination_class = LimitOffsetPagination  # Пагинация


class AllBlogsListAPIView(generics.ListAPIView):
    """ Выводим все блоги """
    queryset = Blogs.objects.prefetch_related('blog_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = BlogsSerializer
    pagination_class = LimitOffsetPagination  # Пагинация
    # Поиск по заголовку, содержанию и дате
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['blog_title', 'blog_body']  # Поля, по которым будет выполняться поиск
    filterset_class = BlogsFilter

class ThisBlogListAPIView(generics.RetrieveAPIView):
    """ Выводим одни блог """
    queryset = Blogs.objects.all()
    serializer_class = BlogsSerializer
    lookup_field = 'id'  # Установите поле модели в качестве идентификатора
    lookup_url_kwarg = 'blog_id'  # Установите lookup_url_kwarg в 'blog_id'


class ThisSectionBlogsListAPIView(generics.ListAPIView):
    """ Выводим все блоги секции """
    serializer_class = BlogsSerializer
    pagination_class = LimitOffsetPagination  # Пагинация
    # Поиск по заголовку, содержанию и дате
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['blog_title', 'blog_body']  # Поля, по которым будет выполняться поиск
    filterset_class = BlogsFilter

    def get_queryset(self):
        # Получаем значение параметра blog_sections_id из URL
        blog_sections_id = self.kwargs['blog_sections_id']
        # Фильтруем новости по полю news_sections, используя значение заголовка секции
        queryset = Blogs.objects.prefetch_related('blog_sections').filter(blog_sections__id=blog_sections_id).order_by(
            '-date_published')
        return queryset
