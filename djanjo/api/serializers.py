from rest_framework import serializers
from .models import CustomUser
from django.core.exceptions import ValidationError

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'rut', 'nombre', 'apellido', 'telefono', 'direccion']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_rut(self, value):
        # Validación adicional para el RUT, si es necesario
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
            direccion=validated_data['direccion']
        )
        user.set_password(validated_data['password'])
        return user
