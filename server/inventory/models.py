from django.db import models
from django.urls import reverse


class ProductType(models.Model):    # High level product types (furniture, clothing, decor)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Categories related to InvType to group inventory items.
class Category(models.Model):
    name = models.CharField(max_length=100)
    inv_type = models.ForeignKey(ProductType, on_delete=models.CASCADE,
                                 related_name="categories", related_query_name="category")

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name


# List comparative items' urls.  Documents name and pricing.
class Comp(models.Model):
    path = models.URLField(max_length=200)
    comp_name = models.CharField(max_length=255, blank=True)
    comp_price = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True)
    inv_item = models.ForeignKey(
        "Product", on_delete=models.PROTECT, related_name='comps')

    class Meta:
        ordering = ["comp_price"]

    def __str__(self):
        return self.path


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
        max_length=50, choices=TAG_CHOICES, default='STYLE')

    def __str__(self):
        return self.name


class UOM(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class SoldInventoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status="sold")


class ReadyInventoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(status="ready_to_list")


class ListedInventoryManager(models.Manager):
    def get_queryset(self):
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

    NEW = "Like new"
    RESTORED = "Restored"
    BEST = "Used: Excellent"
    BETTER = "Used: Very Good"
    GOOD = "Used: Good"
    CONDITION_CHOICES = [
        (NEW, "Like new"),
        (RESTORED, "Restored"),
        (BEST, "Used: Excellent"),
        (BETTER, "Used: Very Good"),
        (GOOD, "Used: Good"),
    ]

    owner = models.ForeignKey(
        'user.User', related_name="items", on_delete=models.PROTECT
    )
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/')
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    cost_unit = models.ForeignKey(
        "UOM", on_delete=models.PROTECT, related_name='cost_items')
    ai_description = models.TextField(blank=True)
    description = models.TextField(blank=True)
    qty = models.IntegerField(default=1)
    price = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True, null=True)
    price_unit = models.ForeignKey(
        "UOM", on_delete=models.PROTECT, related_name='price_uom')
    category = models.ForeignKey(
        "Category", on_delete=models.PROTECT, blank=True, null=True)
    brand = models.CharField(max_length=255, blank=True)
    color = models.CharField(max_length=30, blank=True)
    size = models.CharField(max_length=50, blank=True)
    condition = models.CharField(
        max_length=20, choices=CONDITION_CHOICES, default=RESTORED)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=ACQUIRED)
    tags = models.ManyToManyField(Tag, related_name="items")
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
