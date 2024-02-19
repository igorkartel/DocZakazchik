from django.urls import path

from main_page_information.views import AboutResourceView, SomeFactsView


urlpatterns = [
    path('aboutresource/', AboutResourceView.as_view(), name='resource'),
    path('somefacts/', SomeFactsView.as_view()),

]
