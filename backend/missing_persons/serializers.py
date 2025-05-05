from rest_framework import serializers
from .models import MissingPerson, SuccessStory
class MissingPersonSerializer(serializers.ModelSerializer):
    custom_field = serializers.CharField(write_only=True)  # Example custom field

    class Meta:
        model = MissingPerson
        fields = '__all__'

    def create(self, validated_data):
        # Remove custom_field from validated_data
        validated_data.pop('custom_field', None)

        # Remove user from validated_data if it exists
        user = validated_data.pop('user', None)

        # Create the MissingPerson object
        missing_person = MissingPerson.objects.create(**validated_data)

        # If user is needed, handle it here (e.g., assign it to a related field)
        if user:
            missing_person.reported_by = user  # Assuming the model has a `reported_by` field
            missing_person.save()

        return missing_person
class SuccessStorySerializer(serializers.ModelSerializer):
        missing_person = MissingPersonSerializer(read_only=True)  # Nest MissingPerson details

        class Meta:
            model = SuccessStory
            fields = '__all__'