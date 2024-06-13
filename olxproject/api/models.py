from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
    
# class CustomUser(AbstractUser):
#     email = models.EmailField(unique=True)
#     address = models.CharField(max_length =255)
#     country = models.CharField(max_length=255)
#     state = models.CharField(max_length=255)
#     district = models.CharField(max_length=255)

#     def __str__(self):
#         return self.username

class Register(models.Model):
    name = models.CharField(max_length =255)
    phone = models.CharField(max_length = 10)
    email = models.EmailField(null=True)
    address = models.CharField(max_length =255)
    country = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    