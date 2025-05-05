from django.db import models
from django.conf import settings

class Tip(models.Model):
    missing_person = models.ForeignKey('missing_persons.MissingPerson', on_delete=models.CASCADE)
    reporter_info = models.TextField(blank=True, null=True, help_text="Optional contact information")
    details = models.TextField()
    photo = models.FileField(upload_to='tip_photos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)
