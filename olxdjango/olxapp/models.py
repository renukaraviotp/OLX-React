from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255,null=True)
    country = models.CharField(max_length=255,null=True)
    state = models.CharField(max_length=255,null=True)
    district = models.CharField(max_length=255,null=True)

    def __str__(self):
        return self.username
