from celery import shared_task
from .models import Alert
from django.core.mail import send_mail
from django.contrib.auth.models import User

@shared_task
def schedule_follow_up(alert_id):
    try:
        alert = Alert.objects.get(id=alert_id)
        # Send follow-up or status check
        send_mail(
            subject="Follow-Up on Your Alert",
            message=f"Please update the status of your alert reported at {alert.location}.",
            from_email=User.email,
            recipient_list=[alert.created_by.email]
        )
        return f"Follow-up sent for alert ID {alert_id}"
    except Alert.DoesNotExist:
        return f"Alert ID {alert_id} not found"
