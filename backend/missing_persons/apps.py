from django.apps import AppConfig


class MissingPersonsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'missing_persons'

    def ready(self):
        import missing_persons.signals
