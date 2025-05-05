from rest_framework import serializers
from .models import Volunteer, Task
from authentication.models import User  # Import User model

class VolunteerSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all()
    )

    class Meta:
        model = Volunteer
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('assigned_at',)

        