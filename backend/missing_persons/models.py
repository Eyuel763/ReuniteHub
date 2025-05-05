from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

class MissingPerson(models.Model):
    STATUS_CHOICES = [
        ('missing', 'Missing'),
        ('found', 'Found'),
        ('closed', 'Closed'),
    ]
    
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    contact_info = models.CharField(max_length=255, blank=True, null=True)
    photo = models.ImageField(upload_to='missing_photos/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    last_seen_location = models.CharField(max_length=255)
    last_seen_date = models.DateField(blank=True, null=True)
    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='missing_persons_reports', blank=True,null=True
        )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='missing')
    created_at = models.DateTimeField(auto_now_add=True)

    def is_urgent(self):
        if self.status == 'missing':
            time_difference = timezone.now() - self.created_at
            if time_difference <= timedelta(hours=72):
                return True
            if self.age < 18 or self.age > 60:
                return True
        return False

    def __str__(self):
        return f"{self.name} - {self.status}"
    
class SuccessStory(models.Model):
        missing_person = models.OneToOneField(MissingPerson, on_delete=models.CASCADE, related_name='success_story')
        story_title = models.CharField(max_length=200)
        story_description = models.TextField()
        found_date = models.DateField(blank=True, null=True)
        created_at = models.DateTimeField(auto_now_add=True)

        def __str__(self):
            return self.story_title
