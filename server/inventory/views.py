"""
Sources:
https://www.django-rest-framework.org/api-guide/viewsets/#marking-extra-actions-for-routing
https://www.django-rest-framework.org/api-guide/generic-views/#generic-views

"""

from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Category, ProductType
from user.models import User  # Importing from another app
from rest_framework import permissions, viewsets, filters
from .serializers import ProductCreateUpdateSerializer, ProductFastEntrySerializer, CategorySerializer, ProductTypeSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed, created or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.SearchFilter,
                       DjangoFilterBackend,
                       filters.OrderingFilter,]

    # SearchFilter: text search
    search_fields = ['title', 'status']

    # DjangoFilterBackend: structured filters
    # Date range, Pricing is not set, Status.
    filterset_fields = {
        'created_at': ['exact', 'gte', 'lte'],
        'sold_date': ['exact', 'gte', 'lte'],
        'price': ['isnull'],
        'status': ['exact'],
    }
    # allow ordering by date or price
    ordering_fields = ['created_at', 'price']
    ordering = ['-created_at']  # default order

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductFastEntryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to create a product with a minimal amount of data.
    """
    queryset = Product.objects.all()
    serializer_class = ProductFastEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint for an admin to create categories
    """
    queryset = Category.objects.all().order_by('product_type__name', 'name')
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    # TODO change to object level permissions so that the categories don't get out of control.
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['name']
    filterset_fields = ['product_type']


class ProductTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for an admin to create categories
    """
    queryset = ProductType.objects.all().order_by('name')
    serializer_class = ProductTypeSerializer
    permission_classes = [permissions.IsAuthenticated]
    # TODO change to object level permissions so that the product types don't get out of control.
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
