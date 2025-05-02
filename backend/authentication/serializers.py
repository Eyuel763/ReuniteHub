from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import User

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ( 'email', 'username', 'password', 'first_name', 'last_name', 'phone', 'role')



   
           
