from django.urls import path
from .views import SendAlertView

urlpatterns = [
    path('', SendAlertView.as_view(), name='alert'),
]
