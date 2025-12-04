import pytest
from django.urls import reverse
from inventory.models import Category, ProductType


@pytest.mark.django_db
def test_category_viewset_create(authenticated_client, product_type):
    client, user = authenticated_client
    data = {"name": "New Category", "product_type": product_type.id}
    url = reverse("inventory:category-list")
    response = client.post(url, data, format="multipart")
    assert response.status_code == 201
    assert Category.objects.filter(name="New Category").exists()
