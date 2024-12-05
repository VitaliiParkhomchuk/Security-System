from rest_framework import serializers
from .models import SensorType, UserSensor


class SensorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorType
        fields = ['id', 'sensor_name', 'serial_number']


class UserSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSensor
        fields = ['id', 'name', 'sensor_type', 'sensor_value' ,'created_at']
        read_only_fields = ['id', 'created_at']

    def validate(self, data):
        if not SensorType.objects.filter(serial_number=data['sensor_type'].serial_number).exists():
            raise serializers.ValidationError("Серійний номер не знайдено в базі.")
        return data
