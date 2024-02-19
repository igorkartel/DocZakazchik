from django.urls import path

from user_profile.views import UserRegistrationAPIView, LoginAPIView, LogoutAPIView, EmailConfirmationSentView, \
    EmailConfirmationView, EmailConfirmationSuccessView, EmailConfirmationErrorView, PasswordResetView, EmailCheckView, \
    PasswordResetSuccessView, PasswordResetErrorView, get_profile_page

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('email-confirmation-sent/', EmailConfirmationSentView.as_view(), name='email_confirmation_sent'),
    path('confirm-email/<str:uidb64>/<str:token>/', EmailConfirmationView.as_view(), name='email_confirmation'),
    path('email-confirmation-success/', EmailConfirmationSuccessView.as_view(), name='email_confirmation_success'),
    path('email-confirmation-error/', EmailConfirmationErrorView.as_view(), name='email_confirmation_error'),

    path('email-check/', EmailCheckView.as_view(), name='email_check'),
    path('password-reset-page/<str:uidb64>/<str:token>/', PasswordResetView.as_view(), name='password_reset_page'),
    path('password-reset-success/', PasswordResetSuccessView.as_view(), name='password_reset_success'),
    path('password-reset-error/', PasswordResetErrorView.as_view(), name='password_reset_error'),

    path('user-profile/<int:pk>/', get_profile_page, name='get_profile_page'),
]