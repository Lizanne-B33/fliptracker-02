# Sources:
# https://pytest-factoryboy.readthedocs.io/en/latest/
# https://pytest-with-eric.com/pytest-advanced/pytest-django-restapi-testing/
# https://www.django-rest-framework.org/api-guide/testing/


import factory
from django.contrib.auth.hashers import make_password
from user.models import User


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f"user{n}@fliptrackr.com")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    password = factory.LazyFunction(lambda: make_password("testme123"))
    is_staff = False
    is_active = True
