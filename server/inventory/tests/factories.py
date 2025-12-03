# Sources:
# https://codezup.com/master-django-testing-pytest-and-factory-boy-strategies/
# https://schegel.net/posts/simplied-django-tests-with-pytest-and-pytest-factoryboy/
# https://faker.readthedocs.io/en/master/search.html

from typing import Required
import factory
from factory import SubFactory
from factory.django import ImageField
from django.contrib.auth.hashers import make_password
from user.models import User
from ..models import Product, Category, ProductType


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f"user{n}@fliptrackr.com")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    password = factory.LazyFunction(lambda: make_password("testme123"))
    is_staff = False
    is_active = True


class ProductTypeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ProductType

    name = factory.Faker("random_element", elements=[
        "furniture", "decor", "clothing"])


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category
    name = SubFactory(ProductType)


class ProductFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Product
    owner = SubFactory(UserFactory)
    title = factory.Faker("word")
    prod_image = factory.django.ImageField()
    cost = factory.Faker("pydecimal", left_digits=3, right_digits=2)
    cost_unit = factory.Faker("random_element", elements=[
                              "Each", "Pair", "Set"])
    ai_desc = factory.Faker("paragraph", nb_sentences=5)
    fast_notes = factory.Faker("paragraph", nb_sentences=5)
    user_desc = factory.Faker("paragraph", nb_sentences=5)
    qty = factory.Faker("random_int", min=1, max=50)
    price = factory.Faker("pydecimal", left_digits=3, right_digits=2)
    price_unit = factory.Faker("random_element", elements=[
        "each", "pair", "set"])
    category = SubFactory(CategoryFactory)
    brand = factory.Faker("word")
    color = factory.Faker("color")
    size = factory.Faker("text", max_nb_chars=50)
    condition = factory.Faker('random_element', elements=[
                              'NEW', 'RESTORED', 'BEST', 'BETTER', 'GOOD', 'UNDEFINED'])
    status = factory.Faker('random_element', elements=[
                           'acquired', 'ready_to_list', 'listed', 'Sold', 'Removed'])

    class Params:
        minimal = factory.Trait(
            user_desc=None,
            category=None,
            brand=None,
            color=None,
            size=None,
            status='ACQUIRED',
            price=None,
            price_unit=None,
        )
