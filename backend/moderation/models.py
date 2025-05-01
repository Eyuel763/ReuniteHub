from django.db import models
from django.conf import settings
from volunteers.models import Volunteer, Task

class ModeratorAction(models.Model):
    moderator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=50, choices=[('assign_volunteer_task', 'Assign Volunteer Task')])
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class VolunteerTaskAssignment(models.Model):
    moderator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    volunteer = models.ForeignKey(Volunteer, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True, blank=True)  
    task_type = models.CharField(max_length=50)  
    location = models.CharField(max_length=255)  
    notes = models.TextField(blank=True, null=True)
    assigned_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[('assigned', 'Assigned'), ('in_progress', 'In Progress'), ('completed', 'Completed')],
        default='assigned'
    )