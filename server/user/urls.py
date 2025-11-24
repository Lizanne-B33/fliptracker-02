from django.urls import path
from . import views
from user.views import loginView, registerView, CookieTokenRefreshView, logoutView, user

app_name = "user"

urlpatterns = [
    path('login/', views.loginView, name='login'),
    path('register/', views.registerView, name='register'),
    path('logout/', views.logoutView, name='logout'),
    path('refresh/', views.CookieTokenRefreshView.as_view(), name='token_refresh'),
    path('me/', views.user, name='user'),
]
