# inventory/resources.py
from import_export import resources
from .models import Product


class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        fields = (
            'id', 'title', 'category', 'cost', 'purch_qty',
            'qty_unit', 'condition', 'ai_desc', 'fast_notes'
        )
