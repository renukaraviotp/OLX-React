from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import *
from .models import *
from rest_framework import generics, permissions,viewsets
from django.contrib.auth import get_user_model
import logging
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.viewsets import ModelViewSet

CustomUser = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        print("Incoming registration data:", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user).data,
            "message": "User registered successfully."
        }, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        print("Incoming login data:", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
        if user is not None:
            refresh = RefreshToken.for_user(user)
            token_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            if user.is_superuser:
                token_data['message'] = 'Admin login successful'
            else:
                token_data['message'] = 'User login successful'
            return Response(token_data)
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


logger = logging.getLogger(__name__)

class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        # Filter out superusers from the queryset
        return CustomUser.objects.filter(is_superuser=False)

    def get(self, request, *args, **kwargs):
        logger.info(f'Authorization Header: {request.headers.get("Authorization")}')
        return super().get(request, *args, **kwargs)
    

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.all()
    serializer_class = SubcategorySerializer

    def list(self, request):
        category_id = request.query_params.get('category_id')
        if category_id:
            queryset = self.queryset.filter(category_id=category_id)
        else:
            queryset = self.queryset.all()
        
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    
class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()