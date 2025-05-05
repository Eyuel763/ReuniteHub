from django.urls import path
from .views import check_username

urlpatterns = [
    path('check-username/', check_username, name='check-username'),
]
