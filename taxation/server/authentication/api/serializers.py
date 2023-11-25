from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import authenticate


class AuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label=_("Username"))
    password = serializers.CharField(
        label=_("Password"), style={"input_type": "password"}, trim_whitespace=False
    )

    def validate(self, attrs):
        username: str = attrs.get("username")
        password: str = attrs.get("password")
        if username and password:
            if User.objects.filter(username=username.lower(), is_active=False).exists():
                msg = _("user does not exists.")
                raise serializers.ValidationError(msg, code="authorization")
            user = authenticate(
                request=self.context.get("request"),
                username=username.lower(),
                password=password,
            )
            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        label=_("Password"), style={"input_type": "password"}, trim_whitespace=False
    )
    first_name = serializers.CharField(
        label=_("first_name"), style={"input_type": "type"}
    )
    last_name = serializers.CharField(
        label=_("last_name"), style={"input_type": "type"}
    )

    def validate(self, attrs):
        email = attrs.get("email")
        username = attrs.get("username")
        if email:
            if User.objects.filter(email=email.lower()).exists():
                msg = _("Email already exist")
                raise serializers.ValidationError({"email": msg})
        if username:
            if User.objects.filter(username=username.lower()).exists():
                msg = _("Username already exist")
                raise serializers.ValidationError({"username": msg})
        return attrs
