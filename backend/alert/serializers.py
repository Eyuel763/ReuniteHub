from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Alert

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class AlertSerializer(serializers.ModelSerializer):
    missing_person_name = serializers.StringRelatedField(source='missing_person', read_only=True)
    location = serializers.CharField(required=True)
    created_by = serializers.SerializerMethodField()
    class Meta:
        model = Alert
        fields = '__all__'
        read_only_fields = ['id', 'created_by', 'created_at']

    def get_created_by(self, obj):
        return {
            'id': obj.created_by.id,
            'username': obj.created_by.username,
            'email': obj.created_by.email
        }

    def get_missing_person(self, obj):
        if obj.missing_person:
            return {
                'id': obj.missing_person.id,
                'name': obj.missing_person.name,
                'age': obj.missing_person.age
            }
        return None
