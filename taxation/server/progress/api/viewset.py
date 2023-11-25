from rest_framework import mixins
from progress.api.serializer import TaxationProgressSerializer
from progress.models import TaxationProgress
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status


class TaxationViewset(ModelViewSet):
    # Only retreive taxation data
    serializer_class = TaxationProgressSerializer
    queryset = TaxationProgress.objects.all()
    http_method_names = ["get"]
    permission_classes = [IsAuthenticated]
    lookup_field = "user__username"
    lookup_url_kwarg = "user__username"

    def list(self, request, *args, **kwargs):
        return Response(
            {"error": "HTTP method not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def retrieve(self, request, *args, **kwargs) -> Response:
        auth_user_username: int = self.request.user.username
        username = kwargs.get("user__username")
        if auth_user_username != username:
            return Response(
                {"error": "Permission Denied."}, status=status.HTTP_403_FORBIDDEN
            )
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
