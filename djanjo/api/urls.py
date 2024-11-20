from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import user_login, user_logout, user_register, get_user_current


urlpatterns = [
    path('user/register/', user_register, name='user_register'),
    path('user/login/', user_login, name='user_login'),
    path('user/logout/', user_logout, name='user_logout'),
    path('user/current/', get_user_current, name='user_current'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
