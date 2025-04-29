from django.db import models
from django.conf import settings

class ModeratorAction(models.Model):
    moderator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action_type = models.CharField(max_length=50, choices=[('verify_report', 'Verify Report'), ('approve_tip', 'Approve Tip'), ('resolve_support', 'Resolve Support'), ('review_image_search', 'Review Image Search')])
    message = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
