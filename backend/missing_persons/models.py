from django.db import models
from django.db import models
from django.conf import settings

class MissingPerson(models.Model):
    name = models.CharField(max_length=255)
    photo = models.FileField(upload_to='missing_person_photos/')  # Basic upload
    age = models.IntegerField()
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')])
    last_seen_location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=[('missing', 'Missing'), ('found', 'Found'), ('recovered', 'Recovered')], default='missing')
    submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
