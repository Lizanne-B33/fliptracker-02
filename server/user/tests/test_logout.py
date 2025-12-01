import pytest
from django.urls import reverse
from user.models import User


@pytest.mark.django_db
def test_logout(client):
    # Create user with hashed password
    user = User.objects.create_user(
        email="test@example.com", password="testme123")

    # Log in
    login_response = client.post(
        reverse("user:login"),
        {"email": user.email, "password": "testme123"},
        content_type="application/json"
    )
    # make sure login is successful
    assert login_response.status_code in (200, 201)

    # Grab token from login response
    tokens = login_response.json()
    access_token = tokens.get("access") or tokens.get("access_token")

    # Log out with token
    response = client.post(
        reverse("user:logout"),
        HTTP_AUTHORIZATION=f"Bearer {access_token}"
    )
    # Logout successful?
    assert response.status_code in (200, 204)

    # Handle plain text response
    data = response.content.decode()
    assert data == ""
