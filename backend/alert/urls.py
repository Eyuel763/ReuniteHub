from django.urls import path
from .views import SendAlertView

urlpatterns = [
    path('alerts/send/', SendAlertView.as_view(), name='send_alert'),
]
