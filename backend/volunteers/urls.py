from rest_framework import routers
from django.urls import path, include
from .views import VolunteerViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register(r'volunteers', VolunteerViewSet, basename='volunteer')
router.register(r'tasks', TaskViewSet, basename='task') # For separate task management

urlpatterns = [
    path('volunteers/available/', VolunteerViewSet.as_view({'get': 'list_available'}), name='list-available'),
    path('', include(router.urls)),
]