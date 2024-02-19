from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = '__all__'


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = '__all__'

class ResetPasswordForm(forms.Form):
    password = forms.CharField(min_length=8, widget=forms.PasswordInput(attrs={"class":"reset-password__input"}), label="Новый пароль")
    password2 = forms.CharField(min_length=8, widget=forms.PasswordInput(attrs={"class":"reset-password__input"}), label="Повторите пароль")