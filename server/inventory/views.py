"""
Sources:
https://www.django-rest-framework.org/api-guide/viewsets/#marking-extra-actions-for-routing
https://www.django-rest-framework.org/api-guide/generic-views/#generic-views

"""

from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Tag, Category, ProductType
from user.models import User  # Importing from another app
from rest_framework import permissions, viewsets
from .serializers import ProductCreateUpdateSerializer, ProductFastEntrySerializer, TagSerializer, CategorySerializer, ProductTypeSerializer


# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed, created or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

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


class ProductTypeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for an admin to create categories
    """
    queryset = ProductType.objects.all().order_by('name')
    serializer_class = ProductTypeSerializer
    permission_classes = [permissions.IsAuthenticated]
    # TODO change to object level permissions so that the categories don't get out of control.
