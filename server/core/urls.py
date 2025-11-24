"""
The OpenAPI (Swagger) code is added to enable tools to generate interactive documentation for endpoint testing.
Code Accreditation: https://github.com/namodynamic/inventory-management-api/blob/main/inventory_management_api/urls.py

URL configuration for FlipTrackr application.
The backend is API only with React functioning as the front end.

The `urlpatterns` list routes URLs to views. For more information please see:
https://docs.djangoproject.com/en/5.2/topics/http/urls/

"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Inventory Management API",
        default_version='v1',
        description="API documentation FlipTrackr application",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="liz.bradshaw.1265@gmail.com"),
        license=openapi.License(name="Test License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('inventory/', include('inventory.urls', namespace='inventory')),
    path('auth/', include('user.urls', namespace='user')),

    # Swagger and Redoc URLs
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
]
