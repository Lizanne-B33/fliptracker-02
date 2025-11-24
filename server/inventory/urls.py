from rest_framework.routers import DefaultRouter
from .views import ItemViewSet

# router used for standard CRUD work.
router = DefaultRouter()
router.register(r'items', ItemViewSet)

app_name = 'inventory'  # required for namespace

urlpatterns = router.urls
