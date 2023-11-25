from django.conf.urls import include
from django.urls import re_path
from rest_framework import routers
from authentication.api.urls import authentication_urls
from progress.api.urls import progress_url

router = routers.DefaultRouter()
app_name = "api"

urlpatterns = [
    re_path(r"^api/", include(router.urls)),
]

urlpatterns += authentication_urls
urlpatterns += progress_url
