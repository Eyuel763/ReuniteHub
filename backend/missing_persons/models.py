from django.db import models
from django.contrib.auth.models import User

class MissingPerson(models.Model):
    STATUS_CHOICES = [
        ('missing', 'Missing'),
        ('found', 'Found'),
        ('closed', 'Closed'),
    ]

    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    photo = models.ImageField(upload_to='missing_photos/')
    description = models.TextField()
    last_seen_location = models.CharField(max_length=255)
    last_seen_date = models.DateField()
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='missing')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.status}"
