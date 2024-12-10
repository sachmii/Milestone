from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, generics
from .serializers import TaskSerializer, RegisterSerializer
from .models import Task
from django.contrib.auth.models import User
from .serializers import UserSerializer

# For registering users
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    

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
        

# Get Tasks for specific user
class TaskList(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        tasks = Task.objects.filter(author=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


class TaskDetail(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, task_id):
        try:
            task = Task.objects.get(id=task_id, author=request.user)
        except Task.DoesNotExist: 
            return Response({'Error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
            title = request.data.get("title")
            description = request.data.get("description")
            completed = request.data.get("completed")

            if not title:
                return Response({'Error': 'No title was given.'}, status=status.HTTP_400_BAD_REQUEST)

            task = Task.objects.create(
                author=request.user,
                title=title,
                description=description,
                completed=completed
            )
            serializer = TaskSerializer(task)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class UserListView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)