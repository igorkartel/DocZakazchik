from django.contrib import admin
from user_profile.models import Profile, TeamMemberSpeciality
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from django.contrib.auth import get_user_model

User = get_user_model()


# привожу внешний вид редактирования записи о пользователе в админке к стандартному
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2')}
         ),
    )


admin.site.register(User, CustomUserAdmin)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user',
                    'gender',
                    'date_of_birth',
                    'phone_number',
                    'profile_picture',
                    'profession',
                    'practice',
                    'sphere_of_interest',
                    )


@admin.register(TeamMemberSpeciality)
class TeamMemberSpecialityAdmin(admin.ModelAdmin):
    list_display = ('speciality',)
