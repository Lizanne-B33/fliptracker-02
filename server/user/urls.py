from django.urls import path
from . import views

app_name = "user"

urlpatterns = [
    path('register/', views.registerView, name='register'),
    path('logout/', views.logoutView, name='logout'),
    path('me/', views.user, name='user'),
]
