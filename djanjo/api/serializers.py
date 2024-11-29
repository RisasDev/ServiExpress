from rest_framework import serializers
from .models import CustomUser, Producto, Proveedor, Servicio, Reserva, FacturaBoleta, Empleado, OrdenPedido, RecepcionProducto
from django.core.exceptions import ValidationError

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'rut', 'nombre', 'apellido', 'telefono', 'direccion']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_rut(self, value):
        if not value:
            raise ValidationError("El RUT es obligatorio")
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            rut=validated_data['rut'],
            nombre=validated_data['nombre'],
            apellido=validated_data['apellido'],
            telefono=validated_data['telefono'],
            direccion=validated_data['direccion'],
            password=validated_data['password']
        )
        return user

# Serializer para Producto
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

# Serializer para Proveedor
class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

# Serializer para Servicio
class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

# Serializer para Reserva
class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'

# Serializer para FacturaBoleta
class FacturaBoletaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacturaBoleta
        fields = '__all__'

# Serializer para Empleado
class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'

# Serializer para OrdenPedido
class OrdenPedidoSerializer(serializers.ModelSerializer):
    productos = ProductoSerializer(many=True)
    class Meta:
        model = OrdenPedido
        fields = '__all__'

# Serializer para RecepcionProducto
class RecepcionProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecepcionProducto
        fields = '__all__'
