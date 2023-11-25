from django.db import models
from typing import List

# Create your models here.


class TaxationProgress(models.Model):
    """Model: Taxation Progress"""

    STEP_CHOICES = (
        (1, "Account Setup"),
        (2, "Provide tax docs"),
        (3, "Provide missing info"),
        (4, "Tax return in progress"),
        (5, "Review"),
        (6, "Esign"),
        (7, "Submitted to IRS"),
        (8, "Accepted"),
    )
    user = models.OneToOneField("auth.User", on_delete=models.CASCADE)
    step = models.IntegerField(
        default=1, choices=STEP_CHOICES
    )  # Make sure the default is step 1
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Taxation progress for user {self.user.username}: {self.get_percentage}% complete"

    @property
    def get_total_steps(self):
        return len(self.STEP_CHOICES)

    @property
    def get_percentage(self) -> int:
        percentage = (self.step / self.get_total_steps) * 100
        return percentage

    @property
    def get_taxation_steps(self) -> List[dict]:
        taxation_steps: List[dict] = []
        for i in self.STEP_CHOICES:
            taxation_steps.append({"key": i[0], "value": i[1]})
        return taxation_steps

    @property
    def get_step_value(self) -> str:
        return self.get_step_display()
