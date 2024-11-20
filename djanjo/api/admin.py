from django.contrib import admin
from .models import CustomUser, Servicio, ReservaHora, Rubro, Proveedor, FacturaBoleta, Producto, Rol, Empleado, OrdenPedido, DetalleOrdenPedido, RecepcionProducto, TipoInforme, InformeEstadisticas

admin.site.register(CustomUser)
admin.site.register(Servicio)
admin.site.register(ReservaHora)
admin.site.register(Rubro)
admin.site.register(Proveedor)
admin.site.register(FacturaBoleta)
admin.site.register(Rol)
admin.site.register(Empleado)
admin.site.register(Producto)
admin.site.register(OrdenPedido)
admin.site.register(DetalleOrdenPedido)
admin.site.register(RecepcionProducto)
admin.site.register(TipoInforme)
admin.site.register(InformeEstadisticas)