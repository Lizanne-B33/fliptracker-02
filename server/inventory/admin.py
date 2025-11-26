from django.contrib import admin
from .models import ProductType, Category, Comp, Tag, UOM, Product

# Register your models here.

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Comp)
admin.site.register(Tag)
admin.site.register(UOM)
admin.site.register(ProductType)
