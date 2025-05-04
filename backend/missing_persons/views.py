from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import MissingPerson, SuccessStory
from .serializers import MissingPersonSerializer, SuccessStorySerializer
from django.utils import timezone
from datetime import timedelta
# Removed unnecessary import as IsOwnerOrAdmin is defined in this file
# Create your views here.
class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.reported_by == request.user or request.user.is_staff
class MissingPersonViewSet(viewsets.ModelViewSet):
    queryset = MissingPerson.objects.all()
    serializer_class = MissingPersonSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'location']
    ordering_fields = ['created_at', 'updated_at']
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
    def get_permissions(self):
     if self.action in ['update', 'partial_update', 'mark_as_found', 'close_case']:
        self.permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]
     elif self.action == 'destroy':
        self.permission_classes = [permissions.IsAdminUser]
     return super().get_permissions()

    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def mark_as_Found(self, request, pk=None):

            missing_person = self.get_object()
            missing_person.is_found = True
            missing_person.save()
            return Response({'status': 'Missing person marked as found'}, status=status.HTTP_200_OK)
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated, IsOwnerOrAdmin])
    def close_case(self, request, pk=None):
        person = self.get_object()
        person.status = 'closed'
        person.save()
        return Response({'status': 'case closed'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def recent(self, request):
        seven_days_ago = timezone.now() - timedelta(days=7)
        recent_reports = MissingPerson.objects.filter(created_at__gte=seven_days_ago)
        serializer = self.get_serializer(recent_reports, many=True)
        return Response(serializer.data)
    
class SuccessStoryListView(generics.ListAPIView):
    queryset = SuccessStory.objects.all()
    serializer_class = SuccessStorySerializer

class SuccessStoryDetailView(generics.RetrieveAPIView):
    queryset = SuccessStory.objects.all()
    serializer_class = SuccessStorySerializer
    lookup_field = 'missing_person_id'  # Use missing_person's ID for lookup

class UrgentMissingPersonListView(generics.ListAPIView):
    serializer_class = MissingPersonSerializer

    def get_queryset(self):
        return MissingPerson.objects.filter(status='missing').filter(age__lt=18) | \
               MissingPerson.objects.filter(status='missing').filter(age__gt=60) | \
               MissingPerson.objects.filter(status='missing', created_at__gte=timezone.now() - timedelta(hours=72))
