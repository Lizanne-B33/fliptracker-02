"""
Sources:
https://www.django-rest-framework.org/tutorial/quickstart/#quickstart

"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from .views import ProductFastEntryViewSet, ProductViewSet, CategoryViewSet

# router used for standard CRUD work.
router = routers.DefaultRouter()

router.register(r'product-fast', ProductFastEntryViewSet,
                basename='product-fast')
router.register(r'product-full', ProductViewSet, basename='product-full')

app_name = 'inventory'  # required for namespace

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
