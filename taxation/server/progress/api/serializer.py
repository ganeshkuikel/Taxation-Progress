from rest_framework import serializers
from progress.models import TaxationProgress


class TaxationProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxationProgress
        exclude = (
            "user",
            "updated_at",
            "created_at",
        )

    def to_representation(self, instance: TaxationProgress):
        data = super().to_representation(instance)
        data["total_steps"] = instance.get_total_steps
        data["progress"] = instance.get_percentage
        data["steps"] = instance.get_taxation_steps
        data["step"] = instance.get_step_value
        return data
