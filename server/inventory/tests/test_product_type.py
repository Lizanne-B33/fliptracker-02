import pytest
from django.urls import reverse
from inventory.models import ProductType


@pytest.mark.django_db
def test_product_type_viewset_create(authenticated_client):
    client, user = authenticated_client
    data = {"name": "New Product Type"}
    url = reverse("inventory:product_type-list")
    response = client.post(url, data, format="multipart")
    assert response.status_code == 201
    assert ProductType.objects.filter(name="New Product Type").exists()
