from django.contrib import admin
from .models import SensorType, UserSensor


@admin.register(SensorType)
class SensorTypeAdmin(admin.ModelAdmin):
    list_display = ('sensor_name', 'serial_number')
    search_fields = ('sensor_name', 'serial_number')


@admin.register(UserSensor)
class UserSensorAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'sensor_type', 'sensor_value' , 'created_at')
    search_fields = ('name', 'sensor_type__serial_number', 'user__email')
    list_filter = ('created_at',)
