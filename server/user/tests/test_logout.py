import pytest
from django.urls import reverse
from user.models import User


@pytest.mark.django_db
def test_logout(client):
    # Create user with hashed password
    user = User.objects.create_user(
        email="test@example.com", password="testme123"
    )

    # Log in via SimpleJWT
    login_response = client.post(
        reverse("token_obtain_pair"),
        {"email": user.email, "password": "testme123"},
        content_type="application/json"
    )
    assert login_response.status_code == 200

    # Grab token from login response
    tokens = login_response.json()
    access_token = tokens["access"]

    # Log out with token
    response = client.post(
        reverse("user:logout"),
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )
    assert response.status_code in (200, 204)

    # Check response content
    data = response.json() if response.content else {}
    assert data.get("detail") == "Logged out"
