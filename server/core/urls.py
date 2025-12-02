"""
URL configuration for FlipTrackr application.
The backend is API only with React functioning as the front end.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT auth endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App routes
    # your custom user app
    path('api/user/', include('user.urls', namespace='user')),
    path('api/inventory/', include('inventory.urls',
         namespace='inventory')),  # your inventory app
]
