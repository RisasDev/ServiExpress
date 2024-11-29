from django.contrib.auth import authenticate, login, logout

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import CustomUserSerializer, ProductoSerializer, ProveedorSerializer, ServicioSerializer, ReservaSerializer, FacturaBoletaSerializer, EmpleadoSerializer, OrdenPedidoSerializer, RecepcionProductoSerializer
from .models import CustomUser, Producto, Proveedor, Servicio, Reserva, FacturaBoleta, Empleado, OrdenPedido, RecepcionProducto

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken

from django.db.models import Sum

class CustomUserCreate(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "is_superuser": user.is_superuser,
        })

class ReservaListView(APIView):
    def get(self, request):
        reservas = Reserva.objects.all()
        serializer = ReservaSerializer(reservas, many=True)
        return Response(serializer.data)

    def post(self, request):
        try:
            serializer = ReservaSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"Error al crear reserva: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST) 

class ReservaDetailView(APIView):
    def get(self, request, pk):
        try:
            reserva = Reserva.objects.get(pk=pk)
        except Reserva.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ReservaSerializer(reserva)
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            reserva = Reserva.objects.get(pk=pk)
        except Reserva.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        reserva.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ProveedorListCreateView(generics.ListCreateAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ProveedorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    
class FacturaBoletaListCreateView(generics.ListCreateAPIView):
    queryset = FacturaBoleta.objects.all()
    serializer_class = FacturaBoletaSerializer

class FacturaBoletaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FacturaBoleta.objects.all()
    serializer_class = FacturaBoletaSerializer
    
class EmpleadoListCreateView(generics.ListCreateAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class EmpleadoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    
class ServicioListCreateView(generics.ListCreateAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class ServicioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    
class OrdenPedidoListCreateView(generics.ListCreateAPIView):
    queryset = OrdenPedido.objects.all()
    serializer_class = OrdenPedidoSerializer

class OrdenPedidoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrdenPedido.objects.all()
    serializer_class = OrdenPedidoSerializer
    
class RecepcionProductoListCreateView(generics.ListCreateAPIView):
    queryset = RecepcionProducto.objects.all()
    serializer_class = RecepcionProductoSerializer

class RecepcionProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
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
        elif CustomUser.objects.filter(email=request.data.get('email')).exists():
            return Response({"error": "El email ya está en uso."}, status=status.HTTP_400_BAD_REQUEST)
        elif CustomUser.objects.filter(rut=request.data.get('rut')).exists():
            return Response({"error": "El rut ya está en uso."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Error al registrar usuario: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_superuser': user.is_superuser,
        'is_staff': user.is_staff,
    })

@api_view(['GET'])
def estadisticas_generales(request):
    total_facturas = FacturaBoleta.objects.count()
    total_servicios = Servicio.objects.count()
    ingresos_totales = FacturaBoleta.objects.aggregate(total=Sum('monto'))['total']

    data = {
        "total_facturas": total_facturas,
        "total_servicios": total_servicios,
        "ingresos_totales": ingresos_totales,
    }
    return Response(data)
