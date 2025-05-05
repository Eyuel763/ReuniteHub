from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MissingPerson, SuccessStory
from django.utils.text import slugify

@receiver(post_save, sender=MissingPerson)
def create_success_story_on_found(sender, instance, **kwargs):
    if instance.status == 'found' and not hasattr(instance, 'success_story'):
        title = f"Found: {instance.name}"
        SuccessStory.objects.create(
            missing_person=instance,
            story_title=title,
            story_description=f"We are happy to report that {instance.name} has been found!",
            found_date=instance.last_seen_date if instance.last_seen_date else None # Use last seen date as found date if available
        )
    elif instance.status != 'found' and hasattr(instance, 'success_story'):
        instance.success_story.delete() # Delete success story if status changes from 'found'