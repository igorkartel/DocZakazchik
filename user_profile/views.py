from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.models import Site
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.generic import TemplateView, FormView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from django.contrib.auth import get_user_model
from django.conf import settings
from django.shortcuts import render
from copyright_contacts.models import Contacts, Copyright
from user_profile.forms import ResetPasswordForm

from user_profile.serializers import UserRegistrationSerializer, LoginSerializer, EmailSerializer, \
    ResetPasswordSerializer


User = get_user_model()


class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data, context={"request": request})
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data.get("username")
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")
            password2 = serializer.validated_data.get("password2")
            if User.objects.filter(username=username).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Пользователь с таким email уже существует'}, status=status.HTTP_400_BAD_REQUEST)
            if password != password2:
                return Response({'error': 'Пароли не совпадают'}, status=status.HTTP_400_BAD_REQUEST)
            user = User(username=username, email=email, password=password, is_active=False)
            user.set_password(password)
            user.save()

            '''Функционал для отправки письма и генерации токена'''
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            activation_url = reverse_lazy('email_confirmation', kwargs={'uidb64': uid, 'token': token})
            # current_site = Site.objects.get_current().domain
            send_mail(
                'Подтвердите свой электронный адрес',
                f'Пожалуйста, перейдите по следующей ссылке, чтобы подтвердить свой адрес электронной почты: http://127.0.0.1:8000{activation_url}',
                'igor-arsenal@yandex.by',
                [user.email],
                fail_silently=False,
            )

            return Response({'success': 'На Вашу электронную почту отправлено письмо с подтверждением'},
                            status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailConfirmationView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect(
                reverse_lazy('email_confirmation_success'))

        return redirect(reverse_lazy('email_confirmation_error'))


class EmailConfirmationSentView(TemplateView):
    template_name = 'email_confirmation_sent.html'


class EmailConfirmationSuccessView(TemplateView):
    template_name = 'email_confirmation_success.html'


class EmailConfirmationErrorView(TemplateView):
    template_name = 'email_confirmation_error.html'


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data.get("username")
            password = serializer.validated_data.get("password")
            user = authenticate(request, username=username, password=password)
            if user and user.is_active:
                login(request, user)
                return Response({'success': 'Пользователь успешно авторизовался', 'username': username, 'id': user.id})
            raise serializers.ValidationError("Пользователь не авторизован")


class LogoutAPIView(APIView):
    def get(self, request, *args, **kwargs):
        logout(request)
        return Response({'success': 'Вы вышли из учетной записи'}, status=status.HTTP_401_UNAUTHORIZED)


class EmailCheckView(APIView):
    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get("email")
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                activation_url = reverse_lazy('password_reset_page', kwargs={'uidb64': uid, 'token': token})
                send_mail(
                    'Восстановление пароля',
                    f'Для восстановления пароля перейдите по данной ссылке: http://127.0.0.1:8000{activation_url}',
                    'igor-arsenal@yandex.by',
                    [email],
                    fail_silently=False,
                )
                return Response({'success': 'На Вашу электронную почту отправлено письмо для восстановления пароля'},
                                status=status.HTTP_201_CREATED)
            return Response({'error': 'Пользователя с такой почтой не существует'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
class PasswordResetView(FormView):
    form_class = ResetPasswordForm
    template_name = 'password_reset_page.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        copyright_queryset = Copyright.objects.all()
        contacts_queryset = Contacts.objects.all()

        contacts_names = contacts_queryset.filter(contact_title__startswith="Написать")
        contacts_icons = contacts_queryset.exclude(contact_title__startswith="Написать")

        context['copyright'] = copyright_queryset[0]
        context['contacts_icons'] = contacts_icons
        context['contacts_names'] = contacts_names

        return context

    def post(self, request, uidb64, token):
        passwords_form = ResetPasswordForm(request.POST)
        
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):

            if passwords_form.is_valid():
                
                password = passwords_form.cleaned_data.get("password")
                password2 = passwords_form.cleaned_data.get("password2")
                if password != password2:
                    passwords_form = ResetPasswordForm(request.POST)
                    return render(request, 'password_reset_page.html', context = {'form': passwords_form, "form_error": "Пароли не совпадают"})
                user.set_password(password)
                user.save()
                return redirect(reverse_lazy('password_reset_success'))
            else:
                print(passwords_form.errors)
                print(passwords_form)
                #passwords_form = ResetPasswordForm()
                return render(request, 'password_reset_page.html', context = {'form': passwords_form})
        return  redirect(reverse_lazy('password_reset_error'))


class PasswordResetSuccessView(TemplateView):
    template_name = 'password_reset_success.html'


class PasswordResetErrorView(TemplateView):
    template_name = 'password_reset_error.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        copyright_queryset = Copyright.objects.all()
        contacts_queryset = Contacts.objects.all()

        contacts_names = contacts_queryset.filter(contact_title__startswith="Написать")
        contacts_icons = contacts_queryset.exclude(contact_title__startswith="Написать")

        context['copyright'] = copyright_queryset[0]
        context['contacts_icons'] = contacts_icons
        context['contacts_names'] = contacts_names

        return context
    

def get_profile_page(request, pk):
    content = {}
    user = User.objects.filter(id=pk)
    content['user'] = user[0]
    content['referer'] = request.META.get('HTTP_HOST')
    return render(request, template_name='user_profile_page.html', context=content)
