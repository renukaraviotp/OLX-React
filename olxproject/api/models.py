from django.db import models

# Create your models here.
class Register(models.Model):
    name = models.CharField(max_length =255)
    phone = models.CharField(max_length = 10)
    email = models.EmailField(null=True)
    address = models.CharField(max_length =255)
    country = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    