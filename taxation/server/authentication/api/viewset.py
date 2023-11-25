from rest_framework.views import APIView
from authentication.api.serializers import AuthTokenSerializer, SignupSerializer
from rest_framework import decorators, permissions
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.db import transaction
from progress.models import TaxationProgress
from django.contrib.auth.models import update_last_login


def get_user_response(user: User) -> dict:
    return {
        "id": user.pk,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "username": user.username,
        "is_superuser": user.is_superuser,
    }


class SignInViewset(APIView):
    serializer_class = AuthTokenSerializer

    @decorators.permission_classes([permissions.AllowAny])
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user: User = serializer.validated_data["user"]
        update_last_login(None, user)
        token, _ = Token.objects.get_or_create(user=user)
        user_data = get_user_response(user)
        return Response(
            {
                "access": str(token.key),
                "user_data": user_data,
            }
        )


class SignUpViewset(APIView):
    serializer_class = SignupSerializer

    @decorators.permission_classes([permissions.AllowAny])
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        with transaction.atomic():
            user: User = User(
                username=serializer.validated_data["username"].lower(),
                first_name=serializer.validated_data["first_name"].capitalize(),
                last_name=serializer.validated_data["last_name"].capitalize(),
                is_active=True,
            )
            user.set_password(serializer.validated_data["password"])
            user.save()
            TaxationProgress.objects.create(user=user)
            serializer = AuthTokenSerializer(
                data=request.data, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            user: User = serializer.validated_data["user"]
            update_last_login(None, user)
            token, _ = Token.objects.get_or_create(user=user)
            user_data = get_user_response(user)
            return Response(
                {
                    "access": str(token.key),
                    "user_data": user_data,
                }
            )
