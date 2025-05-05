from rest_framework import serializers
from .models import ModeratorAction, VolunteerTaskAssignment
from volunteers.models import Volunteer, Task

class ModeratorActionSerializer(serializers.ModelSerializer):
    moderator = serializers.ReadOnlyField(source='moderator.username')

    class Meta:
        model = ModeratorAction
        fields = '__all__'
        read_only_fields = ('created_at',)

class VolunteerTaskAssignmentSerializer(serializers.ModelSerializer):
    moderator = serializers.ReadOnlyField(source='moderator.username')
    volunteer_username = serializers.ReadOnlyField(source='volunteer.user.username')
    task_type = serializers.CharField(source='task.task_type', read_only=True, allow_null=True)
    location = serializers.CharField(source='task.location', read_only=True, allow_null=True)

    class Meta:
        model = VolunteerTaskAssignment
        fields = '__all__'
        read_only_fields = ('assigned_at', 'moderator', 'task')

class AssignVolunteerTaskSerializer(serializers.Serializer):
    volunteer_id = serializers.IntegerField(required=True)
    task_type = serializers.CharField(required=True)  # Get task_type
    location = serializers.CharField(required=True)  # Get location
    notes = serializers.CharField(required=False, allow_blank=True)

    def validate_volunteer_id(self, value):
        try:
            Volunteer.objects.get(pk=value)
            return value
        except Volunteer.DoesNotExist:
            raise serializers.ValidationError("Volunteer with this ID does not exist.")