"""
Sources:
https://www.django-rest-framework.org/api-guide/viewsets/#marking-extra-actions-for-routing
https://www.django-rest-framework.org/api-guide/generic-views/#generic-views

"""

from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Category, ProductType
from user.models import User  # Importing from another app
from rest_framework import permissions, viewsets, filters
from .serializers import ProductCreateUpdateSerializer, ProductFastEntrySerializer, CategorySerializer, ProductTypeSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models.functions import TruncMonth
from django.db.models import Sum, F, FloatField
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductCreateUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter,
                       DjangoFilterBackend,
                       filters.OrderingFilter]

    search_fields = ['title', 'status']
    filterset_fields = {
        'created_at': ['exact', 'gte', 'lte'],
        'sold_date': ['exact', 'gte', 'lte'],
        'price': ['isnull'],
        'status': ['exact'],
    }
    ordering_fields = ['created_at', 'price', 'title']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        qs = Product.objects.all()
        status = self.request.query_params.get('status')
        if status == 'removed':
            return qs.filter(status='removed')
        return qs.exclude(status='removed')

    def get_object(self):
        # Always allow lookup by pk, even if status=removed
        return Product.objects.get(pk=self.kwargs['pk'])

    @action(detail=False, methods=['get'], url_path='profit-by-month')
    def profit_by_month(self, request):
        sold_products = (
            Product.objects.filter(status="sold")
            .annotate(
                month=TruncMonth('updated_at'),
                profit=((F('price') * 0.75 - F('cost')) * F('purch_qty'))
            )
            .values('month')
            .annotate(total_profit=Sum('profit', output_field=FloatField()))
            .order_by('month')
        )

        # Convert month to YYYY-MM format
        data = [
            {
                "month": item["month"].strftime("%Y-%m"),
                "profit": round(item["total_profit"], 2)
            }
            for item in sold_products
        ]

        return Response(data)


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
