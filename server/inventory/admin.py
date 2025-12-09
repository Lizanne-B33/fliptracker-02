# added django-import-export to load data.

# inventory/admin.py
from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import ProductType, Category, Tag, Product
from .resources import ProductResource


@admin.register(Product)
class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'product_type']


admin.site.register(Tag)
admin.site.register(ProductType)
