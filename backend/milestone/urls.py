from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomeView, LogoutView, TaskList
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter()
router.register(r'tasks', TaskList)

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]