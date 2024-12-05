from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomeView, LogoutView, TaskList
from rest_framework_simplejwt import views as jwt_views

