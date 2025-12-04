# Source: help from Copilot to help get over this hurdle with images.
# inventory/tests/conftest.py

import pytest
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from .factories import UserFactory
from inventory.models import ProductType, Category


@pytest.fixture
def test_image():
    """Return a tiny valid JPEG image for upload tests."""
    file = BytesIO()
    image = Image.new("RGB", (1, 1), color="white")
    image.save(file, "JPEG")
    file.seek(0)
    return SimpleUploadedFile("test.jpg", file.read(), content_type="image/jpeg")


@pytest.fixture
def api_client():
    """Return a DRF APIClient instance."""
    return APIClient()


@pytest.fixture
def authenticated_client(api_client):
    """Return an APIClient already authenticated with a test user."""
    user = UserFactory()
    api_client.force_authenticate(user=user)
    return api_client, user


@pytest.fixture
def product_type():
    """ A default ProductType """
    return ProductType.objects.create(name="Shared")


@pytest.fixture
def category(product_type):
    """A default Category tied to the shared ProductType fixture."""
    return Category.objects.create(name="Uncategorized", product_type=product_type)
