from rest_framework import serializers
from .models import Product, Tag, Comp, Category
from user.models import User  # Importing from another app


class ProductCreateUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = InvItem
        fields = '__all__'
        read_only_fields = ['owner', 'created_at', 'updated_at']


class ProductAcquireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = 'image', 'cost', 'cost_uom', 'ai_description', 'comparative', 'qty'
        read_only_fields = ['owner', 'created_at', 'updated_at']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class CompSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comp
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
