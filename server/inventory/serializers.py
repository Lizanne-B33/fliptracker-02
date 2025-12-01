"""
Sources:
https://www.django-rest-framework.org/tutorial/quickstart/#quickstart
https://www.django-rest-framework.org/api-guide/fields/

"""

from rest_framework import serializers
from .models import Product, Tag, Category
from user.models import User  # Importing from another app


class ProductCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['owner', 'created_at', 'updated_at']


class ProductFastEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = 'image', 'cost', 'cost_unit', 'ai_description', 'qty', 'price', 'price_unit', 'condition', 'fast_notes'
        read_only_fields = ['owner', 'created_at', 'updated_at']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
