from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubcategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'notifications', NotificationViewSet, basename='notification')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/customers/', UserListView.as_view(), name='user-list'),
    path('api/', include(router.urls)),
    # path('notifications/', NotificationListView.as_view(), name='notifications'),
    path('api/approved-products/', ApprovedProductListView.as_view(), name='approved-products'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
