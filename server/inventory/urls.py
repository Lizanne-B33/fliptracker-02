"""
Sources:
https://www.django-rest-framework.org/tutorial/quickstart/#quickstart

"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from .views import ProductFastEntryViewSet, ProductViewSet, CategoryViewSet, ProductTypeViewSet

# router used for standard CRUD work.
router = routers.DefaultRouter()

router.register(r'product_type', ProductTypeViewSet, basename='product_type')

router.register(r'category', CategoryViewSet, basename='category')

router.register(r'product_fast', ProductFastEntryViewSet,
                basename='product_fast')

router.register(r'product_full', ProductViewSet, basename='product_full')

app_name = 'inventory'  # required for namespace

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
