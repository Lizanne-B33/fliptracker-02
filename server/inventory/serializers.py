"""
Sources:
https://www.django-rest-framework.org/tutorial/quickstart/#quickstart
https://www.django-rest-framework.org/api-guide/fields/

"""

from rest_framework import serializers
from .models import Product, Tag, Category, ProductType
from user.models import User  # Importing from another app

# Serializer for the Full product


class ProductCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['owner', 'created_at', 'updated_at']

# Intended for create only - generally from mobile.


class ProductFastEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = 'title', 'qty', 'prod_image', 'cost', 'cost_unit', 'ai_desc', 'condition', 'fast_notes'
        read_only_fields = ['owner', 'created_at', 'updated_at']


# Admin functionality
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'
