from django.http import StreamingHttpResponse
from rest_framework.decorators import api_view

from streaming.servises import open_file


@api_view(['GET'])
def get_streaming_video(request, path):
    file, status_code, conthent_length, content_range = open_file(request, path)
    response = StreamingHttpResponse(file, status=status_code, content_type='video/mp4')
    response['Accepted-Ranges'] = 'bytes'
    response['Content-Length'] = str(conthent_length)
    response['Cache-Control'] = 'no-cache'
    response['Content-Range'] = content_range
    return response
    