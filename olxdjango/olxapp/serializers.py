from rest_framework import serializers
from django.contrib.auth import get_user_model
import random
import string
from django.core.mail import send_mail
from .models import *

CustomUser = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'phone', 'address', 'country', 'state', 'district']

    def create(self, validated_data):
        # Generate a random 6-digit number as the password
        password = ''.join(random.choices(string.digits, k=6))
        
        # Create the user
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=password,
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
            country=validated_data.get('country', ''),
            state=validated_data.get('state', ''),
            district=validated_data.get('district', '')
        )

        # Send confirmation email
        send_mail(
            'Registration Confirmation',
            f'Your registration is successful. Your password is {password}.',
            'renukat882@gmail.com',  
            [validated_data['email']],
            fail_silently=False,
        )

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'username', 'email', 'phone', 'address', 'country', 'state', 'district']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = ['id', 'category', 'name']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'category', 'subcategory', 'images', 'is_approved']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class HomeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.images and request:
            return request.build_absolute_uri(obj.images.url)
        return None

