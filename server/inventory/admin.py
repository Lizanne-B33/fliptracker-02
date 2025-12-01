from django.contrib import admin
from .models import ProductType, Category, Tag, Product

# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(ProductType)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'product_type']
