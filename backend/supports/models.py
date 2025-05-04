from django.db import models
from django.conf import settings

class FamilySupport(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    support_message = models.TextField()
    contacted_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('resolved', 'Resolved'), ('in_progress', 'In Progress')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
