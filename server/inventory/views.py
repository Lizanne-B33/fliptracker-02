"""
Sources:
https://www.django-rest-framework.org/api-guide/viewsets/#marking-extra-actions-for-routing
https://www.django-rest-framework.org/api-guide/generic-views/#generic-views

"""

from django.shortcuts import render
from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Tag, Category
from user.models import User  # Importing from another app
from rest_framework import permissions, viewsets
from .serializers import ProductCreateUpdateSerializer, ProductFastEntrySerializer, TagSerializer, CategorySerializer


# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductFastEntryViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductFastEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
