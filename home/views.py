from django.shortcuts import render
from main_page_information.models import AboutResource, SomeFacts
from copyright_contacts.models import Contacts, Copyright
from user_profile.models import User


def get_home_page(request):
    content = {}

    documentation = AboutResource.objects.all()
    actuality = SomeFacts.objects.all()
    copyright_queryset = Copyright.objects.all()
    contacts_queryset = Contacts.objects.all()

    contacts_names = contacts_queryset.filter(contact_title__startswith="Написать")
    contacts_icons = contacts_queryset.exclude(contact_title__startswith="Написать")

    content['documentation'] = documentation[0]
    content['actuality'] = actuality
    content['copyright'] = copyright_queryset[0]
    content['contacts_icons'] = contacts_icons
    content['contacts_names'] = contacts_names
    content['referer'] = request.META.get('HTTP_HOST')

    return render(request, template_name='home_page.html', context=content)

def get_contacts(request):
    content = {}
    content['contacts'] = Contacts.objects.all()
    content['referer'] = request.META.get('HTTP_HOST')

    return render(request, template_name='contacts.html', context=content)

def get_experts(request):
    content = {}
    content['referer'] = request.META.get('HTTP_HOST')

    return render(request, template_name='experts.html', context=content)

def get_documentation(request):
    content = {}
    content['referer'] = request.META.get('HTTP_HOST')
    return render(request, template_name='documentation.html', context=content)

def get_blog(request):
    content = {}
    content['referer'] = request.META.get('HTTP_HOST')
    return render(request, template_name='blog.html', context=content)

def get_news(request):
    content = {}
    content['referer'] = request.META.get('HTTP_HOST')
    return render(request, template_name='news.html', context=content)

def get_library(request):
    content = {}
    content['referer'] = request.META.get('HTTP_HOST')
    return render(request, template_name='library.html', context=content)
