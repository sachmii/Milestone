from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from milestone.views import RegisterView, HomeView, LogoutView, TaskList, TaskDetail, UserListView
from rest_framework_simplejwt import views as jwt_views

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', HomeView.as_view(), name='home'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('tasks/', TaskList.as_view(), name='user_task_list'),
    path('tasks/<int:task_id>', TaskDetail.as_view(), name='user_task_detail'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('', include(router.urls)),
]