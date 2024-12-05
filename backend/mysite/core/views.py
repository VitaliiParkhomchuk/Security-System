from urllib import response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import SensorType, UserSensor
from .serializers import UserSensorSerializer


class AvaliableSensorNames(APIView):
    def get(self, request):
        avaliable_names = ['Датчик вогню', 'Датчик відстані', 'Датчик диму']
        return Response({"sensor_names": avaliable_names})


class CreateSensorView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serial_number = request.data.get('serial_number')
        name = request.data.get('sensor_name')

        try:
            sensor_type = SensorType.objects.get(serial_number=serial_number)
        except SensorType.DoesNotExist:
            return Response({"error": "Серійний номер не знайдено."}, status=status.HTTP_404_NOT_FOUND)

        user_sensor = UserSensor.objects.create(
            user=user,
            name=name,
            sensor_type=sensor_type
        )

        serializer = UserSensorSerializer(user_sensor)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class UpdateSensorsView(APIView):
    def put(self, request):
        sensors_data = request.data 
        
        if isinstance(sensors_data, list):
            for sensor_data in sensors_data:
                serial_number = sensor_data.get('serial_number')
                sensor_value = sensor_data.get('sensor_value')

                if not serial_number or sensor_value is None:
                    return Response({"error": "Не вказано серійний номер або значення сенсора."}, status=status.HTTP_400_BAD_REQUEST)

                try:
                    sensor_type = SensorType.objects.get(serial_number=serial_number)
                except SensorType.DoesNotExist:
                    return Response({"error": f"Сенсор з серійним номером {serial_number} не знайдено."}, status=status.HTTP_404_NOT_FOUND)

                user_sensor = UserSensor.objects.filter(sensor_type=sensor_type).first()

                if user_sensor:
                    user_sensor.sensor_value = sensor_value
                    user_sensor.save()
                else:
                    return Response({"error": f"Сенсор з серійним номером {serial_number} не знайдено у базі даних."}, status=status.HTTP_404_NOT_FOUND)

            return Response({"message": "Значення сенсорів оновлено успішно!"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Запит повинен містити список сенсорів."}, status=status.HTTP_400_BAD_REQUEST)
    

class UserSensorsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        sensors = UserSensor.objects.filter(user=user)
        serializer = UserSensorSerializer(sensors, many=True)

        return Response(serializer.data)
