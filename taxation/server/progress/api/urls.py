from django.urls import re_path
from django.urls import include

from rest_framework.routers import DefaultRouter
from progress.api.viewset import TaxationViewset

app_name = "progress"
router = DefaultRouter()
router.register(r"", TaxationViewset, basename="taxation-progress")

progress_url = [
    re_path(
        r"taxation-progress/", include((router.urls, "progress"), namespace="progress")
    ),
]
