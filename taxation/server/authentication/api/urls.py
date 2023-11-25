from django.urls import re_path

from authentication.api.viewset import SignInViewset, SignUpViewset

authentication_urls = [
    re_path(r"^login", SignInViewset.as_view(), name="login"),
    re_path(r"^signup", SignUpViewset.as_view(), name="signup"),
]
