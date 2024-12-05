from django.urls import path
from .views import AvaliableSensorNames, CreateSensorView, UpdateSensorsView, UserSensorsView

urlpatterns = [
    path('available-sensors/', AvaliableSensorNames.as_view()),
    path('sensors/create/', CreateSensorView.as_view()),
    path('sensors/update/', UpdateSensorsView.as_view()),
    path('sensors/get/', UserSensorsView.as_view())
]