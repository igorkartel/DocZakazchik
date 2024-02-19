from django.contrib.auth import get_user_model
from rest_framework import serializers
from drf_recaptcha.fields import ReCaptchaV2Field

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, allow_null=False, allow_blank=False)
    password = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(min_length=8, write_only=True)
    accept_terms = serializers.BooleanField()
    recaptcha = ReCaptchaV2Field(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'accept_terms', 'recaptcha']

    # проще allow_blank=False
    # def validate_email(self, value):
    #     if not value:
    #         raise serializers.ValidationError('Это поле не может быть пустым')
    #     return value

    def validate_accept_terms(self, value):
        if not value or value == 0:
            raise serializers.ValidationError('Вы должны принять условия пользовательского соглашения')
        return value

    def validate(self, attrs):
        attrs.pop('recaptcha')
        return attrs

      
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(min_length=8, write_only=True)
