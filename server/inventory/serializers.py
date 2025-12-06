"""
Sources:
https://www.django-rest-framework.org/tutorial/quickstart/#quickstart
https://www.django-rest-framework.org/api-guide/fields/

"""

from .models import ProductType
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


# Admin functionality - No longer in scope for MVP
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ProductTypeSerializer(serializers.ModelSerializer):
    # Normal Model serializer automatically generates fields on the model
    # Includes all fields.
    class Meta:
        model = ProductType
        fields = '__all__'

    # Custom Validation - avoids duplicates in data entry,
    # And a friendly error if someone does try.
    def validate(self, data):
        name = data.get('name')

        # Exclude current instance when updating
        qs = ProductType.objects.filter(name=name)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        if qs.exists():
            # Attach error to the specific field
            raise serializers.ValidationError({
                "name": ["This Product Type already exists."]
            })
        return data


class CategorySerializer(serializers.ModelSerializer):
    # Nested serializer for reads
    product_type = ProductTypeSerializer(read_only=True)
    # FK ID field for writes
    product_type_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductType.objects.all(),
        source='product_type',
        write_only=True
    )

    class Meta:
        model = Category
        fields = '__all__'

    def validate(self, data):
        name = data.get('name')
        product_type = data.get('product_type')

        # Custom Error Handling:
        # Avoids issues when updating existing records.
        qs = Category.objects.filter(name=name, product_type=product_type)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)

        # if duplicate category/productType then that is an error.
        if qs.exists():
            raise serializers.ValidationError(
                {"non_field_errors": [
                    "This category/product type pair already exists."]}
            )
        return data
