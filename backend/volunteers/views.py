from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Volunteer, Task
from .serializers import VolunteerSerializer, TaskSerializer
from rest_framework.decorators import action

class VolunteerViewSet(viewsets.ModelViewSet):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly] 

    @action(detail=False, methods=['GET'])
    def list_available(self, request):
        """
        Lists available volunteers based on query parameters.
        """
        queryset = Volunteer.objects.all()
        region = request.query_params.get('region')
        skill = request.query_params.get('skill')

        if region:
            queryset = queryset.filter(region=region)
        if skill:
            queryset = queryset.filter(skills__icontains=skill)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated] 
