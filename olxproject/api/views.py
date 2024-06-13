from django.shortcuts import render
from .models import *
from django.http import JsonResponse,HttpResponse
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework_views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user=Register.objects.create_user(
                name=request.data.get('name'),
                phone=request.data.get('phone'),
                email=request.data.get('email'),
                address=request.data.get('address'),
                country=request.data.get('country'),
                state=request.data.get('state'),
                district=request.data.get('district'),
                )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

