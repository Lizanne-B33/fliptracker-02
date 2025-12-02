from rest_framework import response, decorators as rest_decorators, exceptions as rest_exceptions, permissions as rest_permissions
from user import serializers, models

# Registration


@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.AllowAny])
def registerView(request):
    serializer = serializers.RegistrationSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    if user is not None:
        return response.Response({"detail": "Registered successfully"})
    raise rest_exceptions.AuthenticationFailed("Invalid registration data")


# Current user ("me")
@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    serializer = serializers.UserSerializer(request.user)
    return response.Response(serializer.data)


# Logout
@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logoutView(request):
    # If you want to blacklist refresh tokens, do it here.
    return response.Response({"detail": "Logged out"})
