from django.contrib.auth import authenticate, login, logout

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import CustomUserSerializer
from .models import CustomUser

class CustomUserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    print("view username: ", username)
    print("view password: ", password)

    # Intenta autenticar al usuario
    user = authenticate(username=username, password=password)
    print("user: ", user)

    if user is not None:
        # Especifica el backend utilizado para evitar el error
        login(request, user)  # Reemplaza por el nombre de tu backend
        return Response({"message": "Login exitoso"}, status=status.HTTP_200_OK)
    else:
        print("Credenciales inválidas")
        return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_logout(request):
    logout(request)
    return Response({"message": "Logout exitoso"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def user_register(request):
    serializer = CustomUserSerializer(data=request.data)    
    print("request data: ", request.data)
    
    if serializer.is_valid():
        serializer.create(validated_data=request.data)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
