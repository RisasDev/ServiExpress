from django.contrib.auth import authenticate, login, logout

from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import CustomUserSerializer, ProductoSerializer, ProveedorSerializer, ServicioSerializer, ReservaHoraSerializer, FacturaBoletaSerializer, EmpleadoSerializer, OrdenPedidoSerializer, RecepcionProductoSerializer
from .models import CustomUser, Producto, Proveedor, Servicio, ReservaHora, FacturaBoleta, Empleado, OrdenPedido, RecepcionProducto

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken

class CustomUserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class ReservaHoraViewSet(viewsets.ModelViewSet):
    queryset = ReservaHora.objects.all()
    serializer_class = ReservaHoraSerializer

class FacturaBoletaViewSet(viewsets.ModelViewSet):
    queryset = FacturaBoleta.objects.all()
    serializer_class = FacturaBoletaSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class OrdenPedidoViewSet(viewsets.ModelViewSet):
    queryset = OrdenPedido.objects.all()
    serializer_class = OrdenPedidoSerializer

class RecepcionProductoViewSet(viewsets.ModelViewSet):
    queryset = RecepcionProducto.objects.all()
    serializer_class = RecepcionProductoSerializer

@api_view(['POST'])
def user_login(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)

            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response({
                "message": "Login exitoso",
                "refresh": str(refresh),
                "access": str(access)
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales inválidas"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error al iniciar sesión: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def user_logout(request):
    logout(request)
    return Response({"message": "Logout exitoso"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def user_register(request):
    try:
        username = request.data.get('username')
        if CustomUser.objects.filter(username=username).exists():
            return Response({"error": "El nombre de usuario ya está en uso."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error al registrar usuario: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_user_current(request):
    serializer = CustomUserSerializer(request.user)
    return Response(serializer.data)
