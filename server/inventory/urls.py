from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from .views import ProductFastEntryViewSet, ProductViewSet, CategoryViewSet, ProductTypeViewSet
from .views import ProfitByMonthView
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'product_type', ProductTypeViewSet, basename='product_type')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'product_fast', ProductFastEntryViewSet,
                basename='product_fast')
router.register(r'product', ProductViewSet, basename='product')

app_name = 'inventory'

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("profit-by-month/", ProfitByMonthView.as_view(), name="profit-by-month"),
]
