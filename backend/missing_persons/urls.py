from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MissingPersonViewSet, SuccessStoryListView, SuccessStoryDetailView, UrgentMissingPersonListView

router = DefaultRouter()
router.register(r'reports', MissingPersonViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('success-stories/', SuccessStoryListView.as_view(), name='success-story-list'),
    path('success-stories/<int:missing_person_id>/', SuccessStoryDetailView.as_view(), name='success-story-detail'),
    path('urgent-reports/', UrgentMissingPersonListView.as_view(), name='urgent-reports'),
]
