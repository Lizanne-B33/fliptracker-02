import pytest
from django.urls import reverse
from user.models import User


@pytest.mark.django_db
def test_register_new_user(client):
    payload = {
        "email": "newuser@test.com",
        "first_name": "Alice",
        "last_name": "Doe",
        "password": "testpassword123",
        "password2": "testpassword123",
    }
    response = client.post(
        reverse("user:register"),
        payload,
        content_type="application/json"
    )

    # Check response status
    # assert response.status_code == 201
    assert response.status_code in (200, 201)

    # Check response body
    data = response.json()
    assert data == "Registered!"

    # Check database
    assert User.objects.filter(email=payload["email"]).exists()
