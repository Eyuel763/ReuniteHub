from django.db import models
from django.conf import settings

class Volunteer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    skills = models.TextField(blank=True, null=True)
    availability = models.TextField(blank=True, null=True)
    region = models.CharField(max_length=255, blank=True, null=True)

class Task(models.Model):
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    description = models.TextField()
    assigned_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed')], default='pending')
