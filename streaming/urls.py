from django.urls import path
from . import views


urlpatterns = [
    path('video/<path>', views.get_streaming_video, name='stream')
]