from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):
    # Add any additional fields here
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.username
    
class Category(models.Model):
    name = models.CharField(max_length=255,null=True)

    def __str__(self):
        return self.name

class Subcategory(models.Model):
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE,null=True)
    name = models.CharField(max_length=255,null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    images = models.ImageField(upload_to='product_images/', blank=True, null=True)
    is_approved = models.BooleanField(default=False)  

    def __str__(self):
        return self.name
    
class Notification(models.Model):
    message = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    is_handled = models.BooleanField(default=False)

    def __str__(self):
        return self.message
