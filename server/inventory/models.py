"""
Sources:
https://docs.djangoproject.com/en/5.2/ref/models/fields/
https://www.django-rest-framework.org/api-guide/generic-views/#get_querysetself
https://www.geeksforgeeks.org/python/uniquetrue-django-built-in-field-validation/

"""

from django.db import models
from django.urls import reverse


class ProductType(models.Model):    # High level product types (furniture, clothing, decor)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# Categories related to InvType to group inventory items.
class Category(models.Model):
    name = models.CharField(max_length=100)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE,
                                     related_name="categories", related_query_name="category")

    class Meta:
        ordering = ['product_type_id', 'name']
        verbose_name_plural = "categories"
        constraints = [
            models.UniqueConstraint(
                fields=['name', 'product_type'], name='unique_category_product_type')]

    def __str__(self):
        return self.name


def get_default_category():
    return Category.objects.get(name="Uncategorized").id


class Tag(models.Model):
    # Choices
    STYLE = 'style_aesthetics'
    MATERIAL = 'material'
    CONTEXT = 'context_placement'
    TAG_CHOICES = [
        (STYLE, 'Styles & Aesthetics'),
        (MATERIAL, 'Materials'),
        (CONTEXT, 'Context / Placement'),
    ]

    name = models.CharField(max_length=50)
    tag_category = models.CharField(
        max_length=50, choices=TAG_CHOICES, default='style')

    def __str__(self):
        return self.name


class SoldInventoryManager(models.Manager):
    def get_queryset(self):
        user = self.request.user
        return super().get_queryset().filter(status="sold")


class ReadyInventoryManager(models.Manager):
    def get_queryset(self):
        user = self.request.user
        return super().get_queryset().filter(status="ready_to_list")


class ListedInventoryManager(models.Manager):
    def get_queryset(self):
        user = self.request.user
        return super().get_queryset().filter(status="listed")


class Product(models.Model):
    # Choices
    ACQUIRED = 'acquired'
    READY = 'ready_to_list'
    POSTED = 'listed'
    SOLD = 'sold'
    REMOVED = 'removed'
    STATUS_CHOICES = [
        (ACQUIRED, 'Acquired'),
        (READY, 'Ready to list'),
        (POSTED, 'Listed'),
        (SOLD, 'Sold'),
        (REMOVED, 'Removed'),
    ]

    NEW = "like_new"
    RESTORED = "restored"
    BEST = "used_excellent"
    BETTER = "used_very Good"
    GOOD = "used_good"
    UNDEFINED = "undefined"
    CONDITION_CHOICES = [
        (NEW, "Like new"),
        (RESTORED, "Restored"),
        (BEST, "Used: Excellent"),
        (BETTER, "Used: Very Good"),
        (GOOD, "Used: Good"),
        (UNDEFINED, "Undefined")
    ]

    EA = "each"
    PAIR = "pair"
    SET = "set"
    UOM_CHOICES = [
        (EA, "Each"),
        (PAIR, "Pair"),
        (SET, "Set"),
    ]

    owner = models.ForeignKey(
        'user.User', related_name="items", on_delete=models.PROTECT
    )
    title = models.CharField(max_length=255, blank=True)
    prod_image = models.ImageField(upload_to='images/')
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    cost_unit = models.CharField(
        max_length=15, choices=UOM_CHOICES, default='each')
    ai_desc = models.TextField(blank=True)
    fast_notes = models.TextField(blank=True)
    user_desc = models.TextField(blank=True)
    qty = models.IntegerField(default=1)
    price = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True)
    price_unit = models.CharField(
        max_length=15, choices=UOM_CHOICES, default='each')
    category = models.ForeignKey(
        "Category", on_delete=models.PROTECT, default=get_default_category)
    brand = models.CharField(max_length=255, blank=True)
    color = models.CharField(max_length=30, blank=True)
    size = models.CharField(max_length=50, blank=True)
    condition = models.CharField(
        max_length=20, choices=CONDITION_CHOICES, default='undefined')
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='acquired')
    tags = models.ManyToManyField(Tag, related_name="items", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["title"]

    objects = models.Manager()
    sold_items = SoldInventoryManager()
    ready_items = ReadyInventoryManager()

    def get_absolute_url(self):
        return reverse("product_detail", kwargs={"pk": self.pk})
