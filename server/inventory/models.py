# Code Attribution: https://github.com/namodynamic/inventory-management-api/blob/main/inventory/models.py

from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator
import User

# Create your models here.


## ============ CLASSIFICATION =============== ##
# Domains are specific to a user's sign in session.
# A user will sign in and select one of the domains.
# This value will be set and used for category and item filters.


class Domain(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class meta:
        verbose_name_plural = "Domains"

# Categories are useful for analysis or insights.
# The categories are related to Domains in a 1 : 1 relationship.


class Category(models.Model):
    name = models.TextField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    domain = models.ForeignKey("Domain", verbose_name=(
        "Domains"), on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class meta:
        verbose_name_plural = 'Categories'

## ================= INVENTORY ===================== ##
# Inventory Items are the objects that store each item.
# They are related to the User, as well as to categories.
# One Inventory Item can have many Categories, and Categories can have many Inventory Items.


class Status(models.TextChoices):
    # Status Options
    PURCHASED = 'Purchased'
    READY_TO_POST = 'Ready to Post'
    POSTED = 'Posted'
    SOLD = 'Sold'


class InventoryItems(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    cost_each = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValueValidator(0)])
    category = models.ManyToManyField("app.Model", verbose_name=_("Categories"))(
        Category, on_delete=models.SET_NULL, null=True, related_name='items')
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name='inventory_items')
    date_added = models.DateTimeField(auto_now_add=True)
    item_img = models.ImageField(upload_to='media',
                                 height_field=None,
                                 width_field=None,
                                 max_length=100,
                                 null=True)
    last_updated = models.DateTimeField(auto_now=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PURCHASED,
    )
    calculated_price = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValueValidator(0)])
    price_override = models.BooleanField(default=False)
    sales_price = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValueValidator(0)])
    commission = models.DecimalField(
        max_digits=2, decimal_places=2, default=.25)
    sold = models.BooleanField(default=False)
    profit = models.DecimalField(
        max_digits=5, decimal_places=2, validators=[MinValueValidator(0)])

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "quantity": self.quantity,
            "category": self.category,
            "owner": self.owner,
            "date_added": self.date_added,
            "last_updated": self.last_updated,
            "item_img": self.item_img,
            "status": self.status,
            "calculated_price": self.calculated_price,
            "price_override": self.price_override,
            "sales_price": self.sales_price,
            "commission": self.commission,
            "sold": self.sold,
            "profit": self.profit,
        }

   # TODO
   # Return list of all inventory
   # return list of inventory in each section (purchased, ready to post, posted, sold)
   # serializing of the classes and domains.
   # Build a freeform tags table.
   # Return tags by category
   # update user to include Domain
