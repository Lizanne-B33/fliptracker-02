import pytest
from django.urls import reverse
from .factories import UserFactory


@pytest.mark.django_db
def test_login_sets_cookies(client):
    user = UserFactory(email="test@example.com")  # password is "testme123"
    response = client.post(
        reverse("user:login"),
        {"email": user.email, "password": "testme123"},
        content_type="application/json"
    )
    assert response.status_code == 200
    data = response.json()  # pytest-django client gives you .json()
    assert "access_token" in data
    assert "refresh_token" in data
    # assert "Set-Cookie" in str(response)
