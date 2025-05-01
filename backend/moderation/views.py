from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ModeratorAction, VolunteerTaskAssignment
from .serializers import ModeratorActionSerializer, AssignVolunteerTaskSerializer, VolunteerTaskAssignmentSerializer
from volunteers.models import Volunteer, Task

class IsModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'moderator'

class ModerationViewSet(viewsets.ModelViewSet):
    queryset = ModeratorAction.objects.all()
    serializer_class = ModeratorActionSerializer
    permission_classes = [permissions.IsAuthenticated, IsModerator]

    def perform_create(self, serializer):
        serializer.save(moderator=self.request.user)

    @action(detail=False, methods=['POST'], serializer_class=AssignVolunteerTaskSerializer)
    def assign_task(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        volunteer_id = serializer.validated_data['volunteer_id']
        task_type = serializer.validated_data['task_type']  # Get task_type
        location = serializer.validated_data['location']  # Get location
        notes = serializer.validated_data.get('notes')

        try:
            volunteer = Volunteer.objects.get(pk=volunteer_id)
        except Volunteer.DoesNotExist:
            return Response({"error": "Volunteer not found."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the Task
        task = Task.objects.create(
            volunteer=volunteer,
            task_type=task_type,
            location=location
        )

        # Create the VolunteerTaskAssignment
        assignment = VolunteerTaskAssignment.objects.create(
            moderator=request.user,
            volunteer=volunteer,
            task=task,  # Assign the newly created Task
            task_type=task_type,  # Also store in Assignment
            location=location,  # Also store in Assignment
            notes=notes
        )
        assignment_serializer = VolunteerTaskAssignmentSerializer(assignment)

        ModeratorAction.objects.create(
            moderator=request.user,
            action_type='assign_volunteer_task',
            message=f"Assigned task '{task_type}' at '{location}' to volunteer '{volunteer.user.username}'."  
        )
        return Response(assignment_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['GET'], serializer_class=VolunteerTaskAssignmentSerializer)
    def list_assigned_tasks(self, request):
        queryset = VolunteerTaskAssignment.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['GET'], serializer_class=VolunteerTaskAssignmentSerializer)
    def view_assigned_task(self, request, pk=None):
        try:
            assignment = VolunteerTaskAssignment.objects.get(pk=pk)
            serializer = self.get_serializer(assignment)
            return Response(serializer.data)
        except VolunteerTaskAssignment.DoesNotExist:
            return Response({"error": "Assigned task not found."}, status=status.HTTP_404_NOT_FOUND)
