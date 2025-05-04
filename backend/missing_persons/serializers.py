from rest_framework import serializers
from .models import MissingPerson, SuccessStory

class MissingPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissingPerson
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class SuccessStorySerializer(serializers.ModelSerializer):
        missing_person = MissingPersonSerializer(read_only=True)  # Nest MissingPerson details

        class Meta:
            model = SuccessStory
            fields = '__all__'