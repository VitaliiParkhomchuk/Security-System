from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls'), name='authentication'),
    path('user/', include('user.urls'), name='user'),
    path('', include('core.urls'))
]
