# myproject/urls.py

from django.contrib import admin
from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'subcategories', views.SubcategoryViewSet)
router.register(r'products', views.ProductViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/customers/', UserListView.as_view(), name='user-list'),
    path('api/', include(router.urls)),
]
