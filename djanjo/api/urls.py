from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    user_login, user_logout, user_register, get_user_info,
    ReservaListView, ReservaDetailView,
    ProveedorListCreateView, ProveedorDetailView,
    FacturaBoletaListCreateView, FacturaBoletaDetailView,
    EmpleadoListCreateView, EmpleadoDetailView,
    ServicioListCreateView, ServicioDetailView,
    OrdenPedidoListCreateView, OrdenPedidoDetailView,
    RecepcionProductoListCreateView, RecepcionProductoDetailView,
    UserProfileView, estadisticas_generales)

urlpatterns = [
    path('user/register/', user_register, name='user_register'),
    path('user/login/', user_login, name='user_login'),
    path('user/logout/', user_logout, name='user_logout'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
    path('user/me/', get_user_info, name='get_user_info'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('reservas/', ReservaListView.as_view(), name='reservas-list'),
    path('reservas/<int:pk>/', ReservaDetailView.as_view(), name='reserva-detail'),
    path('proveedores/', ProveedorListCreateView.as_view(), name='proveedor-list-create'),
    path('proveedores/<int:pk>/', ProveedorDetailView.as_view(), name='proveedor-detail'),
    path('facturas/', FacturaBoletaListCreateView.as_view(), name='factura-list-create'),
    path('facturas/<int:pk>/', FacturaBoletaDetailView.as_view(), name='factura-detail'),
    path('empleados/', EmpleadoListCreateView.as_view(), name='empleado-list-create'),
    path('empleados/<int:pk>/', EmpleadoDetailView.as_view(), name='empleado-detail'),
    path('servicios/', ServicioListCreateView.as_view(), name='servicio-list-create'),
    path('servicios/<int:pk>/', ServicioDetailView.as_view(), name='servicio-detail'),
    path('ordenes/', OrdenPedidoListCreateView.as_view(), name='orden-pedido-list-create'),
    path('ordenes/<int:pk>/', OrdenPedidoDetailView.as_view(), name='orden-pedido-detail'),
    path('recepciones/', RecepcionProductoListCreateView.as_view(), name='recepcion-producto-list-create'),
    path('recepciones/<int:pk>/', RecepcionProductoDetailView.as_view(), name='recepcion-producto-detail'),
    path('estadisticas/', estadisticas_generales, name='estadisticas-generales'),
]
