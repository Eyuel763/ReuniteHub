from rest_framework import routers
from .views import ModerationViewSet
from django.urls import path

router = routers.DefaultRouter()
router.register(r'', ModerationViewSet, basename='moderation')

urlpatterns = [
    path('assign-task/', ModerationViewSet.as_view({'post': 'assign_task'}), name='assign_volunteer_task'),
    path('assigned-tasks/', ModerationViewSet.as_view({'get': 'list_assigned_tasks'}), name='list_assigned_tasks'),
    path('assigned-tasks/<int:pk>/', ModerationViewSet.as_view({'get': 'view_assigned_task'}), name='view_assigned_task'),
] + router.urls