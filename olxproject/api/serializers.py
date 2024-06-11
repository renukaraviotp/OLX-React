from rest_framework import serializers
from .models import *

class Registerserialisers(serializers.ModelSerializer):
    class meta:
        model = Register
        fields = '__all__'