from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, status
from .serializers import TaskSerializer
from .models import Task


# For authenticating users -> Postman "GET - Home Page"
class HomeView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {'message': 'Welcome to the authentication page!'}
        return Response(content)
    

# For logging out -> Postman "POST - Logout"
# Authorization token is access token, body contains refresh token
class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class TaskList(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TaskDetail(APIView):
    pass