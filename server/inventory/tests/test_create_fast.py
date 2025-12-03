# Source: help from copilot to get over the hurdle of testing with images.
# first attempt with SimpleUploadedFile failed as it did not generate a
# full image. Backed up and used a conftest.py with helper functions like
# one with Pillow to create a true image. Also has helper functions for creating
# authenticated user and client.

import pytest
from django.urls import reverse
from inventory.models import Product, Category, ProductType


@pytest.mark.django_db
def test_fast_entry_viewset_create(authenticated_client, test_image):
    client, user = authenticated_client

    product_type = ProductType.objects.get(name="Shared")
    category, _ = Category.objects.get_or_create(
        name="Uncategorized",
        defaults={"product_type": product_type},
    )

    data = {
        "title": "Quick Add Product",
        "prod_image": test_image,
        "qty": 3,
        "cost_unit": "each",
        "cost": 12.50,
        "ai_desc": "AI quick description",
    }

    url = reverse("inventory:product-fast-list")
    response = client.post(url, data, format="multipart")

    print(response.status_code, response.data)  # helpful debug

    assert response.status_code == 201
    product = Product.objects.get(title="Quick Add Product")
    assert product.owner == user
    assert product.qty == 3
    assert product.cost_unit == "each"
    assert float(product.cost) == 12.50
    assert product.ai_desc == "AI quick description"
