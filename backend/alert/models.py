from django.db import models
from django.conf import settings

class Alert(models.Model):
    missing_person = models.ForeignKey('missing_persons.MissingPerson', on_delete=models.CASCADE)
    message = models.TextField()
    location = models.CharField(max_length=255)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
