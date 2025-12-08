# Source: help from copilot to get over the hurdle of testing with images.
# first attempt with SimpleUploadedFile failed as it did not generate a
# full image. Backed up and used a conftest.py with helper functions like
# one with Pillow to create a true image. Also has helper functions for creating
# authenticated user and client.

import pytest
from django.urls import reverse
from inventory.models import Product


@pytest.mark.django_db
def test_fast_entry_viewset_create(authenticated_client, test_image, category):
    client, user = authenticated_client

    data = {
        "title": "Quick Add Product",
        "prod_image": test_image,
        "purch_qty": 3,
        "qty_unit": "each",
        "cost": 12.50,
        "ai_desc": "AI quick description",
        "category_id": category.id,
    }

    url = reverse("inventory:product_fast-list")
    response = client.post(url, data, format="multipart")

    print(response.status_code, response.data)  # helpful debug

    assert response.status_code == 201
    product = Product.objects.get(title="Quick Add Product")
    assert product.owner == user
    assert product.purch_qty == 3
    assert product.qty_unit == "each"
    assert float(product.cost) == 12.50
    assert product.ai_desc == "AI quick description"
