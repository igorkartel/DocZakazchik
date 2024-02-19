from django_filters import FilterSet, CharFilter, DateTimeFilter, DateFilter, DateRangeFilter
from .models import News


class NewsFilter(FilterSet):
    date_published = DateTimeFilter(
        field_name='date_published',
        lookup_expr='date',
        label='Дата публикации (дд-мм-гггг)',
        input_formats=['%d-%m-%Y']
    )
    class Meta:
        model = News
        fields = ['date_published']
