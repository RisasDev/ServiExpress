from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    rut = models.CharField(max_length=12, unique=True, null=True, blank=True)
    nombre = models.CharField(max_length=100, null=True, blank=True)
    apellido = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(max_length=100, unique=True, null=True, blank=True)
    telefono = models.IntegerField(null=True, blank=True)
    direccion = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=128)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['rut', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'password']

class Servicio(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    url = models.URLField(max_length=200, blank=True, null=True)
    
    def __str__(self):
        return self.nombre

class Reserva(models.Model):
    cliente = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    servicio = models.ForeignKey('Servicio', on_delete=models.CASCADE)
    fecha_reserva = models.DateTimeField()
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('confirmado', 'Confirmado'), ('cancelado', 'Cancelado')], default='pendiente')
    notas = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f'Reserva de {self.cliente.username} para el servicio {self.servicio.nombre}'
        
class Rubro(models.Model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre

class Proveedor(models.Model):
    nombre = models.CharField(max_length=255)
    rubro = models.ForeignKey(Rubro, on_delete=models.CASCADE)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    
    def __str__(self):
        return f'{self.nombre} - {self.rubro.nombre}'

class FacturaBoleta(models.Model):
    cliente = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    servicios = models.ManyToManyField(Servicio)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_documento = models.CharField(max_length=20, choices=[('factura', 'Factura'), ('boleta', 'Boleta')])
    estado = models.CharField(max_length=20, choices=[('pagado', 'Pagado'), ('pendiente', 'Pendiente')], default='pendiente')
    
    def __str__(self):
        return f'{self.tipo_documento} - {self.cliente.username} - {self.fecha}'

class Rol(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre

class Empleado(models.Model):
    usuario = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    
    def __str__(self):
        return f'{self.usuario.username} ({self.rol.nombre})'

class Producto(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_disponible = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.nombre
    
    def actualizar_stock(self, cantidad):
        """ Actualiza la cantidad disponible del producto """
        self.cantidad_disponible += cantidad
        self.save()
    
    def reducir_stock(self, cantidad):
        """ Reduce la cantidad disponible del producto """
        if self.cantidad_disponible >= cantidad:
            self.cantidad_disponible -= cantidad
            self.save()
        else:
            raise ValueError("No hay suficiente stock disponible.")

class OrdenPedido(models.Model):
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto, through='DetalleOrdenPedido')
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=[('pendiente', 'Pendiente'), ('recibido', 'Recibido'), ('cancelado', 'Cancelado')], default='pendiente')
    
    def __str__(self):
        return f'Orden de Pedido a {self.proveedor.nombre} ({self.estado})'

class DetalleOrdenPedido(models.Model):
    orden_pedido = models.ForeignKey(OrdenPedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    
    def __str__(self):
        return f'{self.producto.nombre} - Cantidad: {self.cantidad}'

class RecepcionProducto(models.Model):
    orden_pedido = models.ForeignKey(OrdenPedido, on_delete=models.CASCADE)
    producto_nombre = models.CharField(max_length=255)
    cantidad_recibida = models.PositiveIntegerField()
    fecha_recepcion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=[('correcto', 'Correcto'), ('incorrecto', 'Incorrecto')], default='correcto')
    
    def __str__(self):
        return f'Recepción de {self.producto_nombre} - Cantidad: {self.cantidad_recibida}'

class TipoInforme(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre

class InformeEstadisticas(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    tipo = models.ForeignKey(TipoInforme, on_delete=models.CASCADE)
    datos = models.JSONField()
    
    def __str__(self):
        return f'Informe de {self.tipo} - {self.fecha}'