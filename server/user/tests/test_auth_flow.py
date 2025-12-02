import pytest
from django.urls import reverse
from .factories import UserFactory


@pytest.mark.django_db
def test_login_returns_jwt_tokens(client):
    user = UserFactory(email="test@example.com")  # password is "testme123"
    response = client.post(
        reverse("token_obtain_pair"),  # name from urls.py
        {"email": user.email, "password": "testme123"},
        content_type="application/json"
    )
    assert response.status_code == 200
    data = response.json()
    assert "access" in data
    assert "refresh" in data
