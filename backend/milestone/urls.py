from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomeView, LogoutView, TaskList

router = DefaultRouter()
router.register(r'tasks', TaskList)

urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
]