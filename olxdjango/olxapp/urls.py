# myproject/urls.py

from django.contrib import admin
from django.urls import path
from .views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('admin/users/', UserListView.as_view(), name='user-list'),
]
