from rest_framework import serializers
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'email', 'first_name', 'phone', 'address', 'country', 'state', 'district']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            phone=validated_data.get('phone', ''),
            address=validated_data.get('address', ''),
            country=validated_data.get('country', ''),
            state=validated_data.get('state', ''),
            district=validated_data.get('district', '')
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'first_name', 'phone', 'address', 'country', 'state', 'district']
