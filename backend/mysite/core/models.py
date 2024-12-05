import random
from django.db import models
from django.conf import settings


class SensorType(models.Model):
    sensor_name = models.CharField(max_length=50, help_text="Назва типу сенсора")
    serial_number = models.CharField(max_length=5, unique=True, editable=False, help_text="Унікальний серійний номер")

    def save(self, *args, **kwargs):
        if not self.serial_number:
            while True:
                serial_number = ''.join(random.choices('0123456789', k=5))
                if not SensorType.objects.filter(serial_number=serial_number).exists():
                    self.serial_number = serial_number
                    break
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.sensor_name} ({self.serial_number})"


class UserSensor(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_sensors",
        help_text="Користувач, який додав сенсор"
    )
    name = models.CharField(max_length=50, help_text="Користувацька назва сенсора (наприклад, 'Датчик на кухні')")
    sensor_type = models.ForeignKey(
        SensorType,
        on_delete=models.CASCADE,
        related_name="user_sensors",
        help_text="Тип сенсора"
    )
    sensor_value = models.FloatField(null=True, blank=True, help_text="Значення сенсора (може бути пустим)")
    created_at = models.DateTimeField(auto_now_add=True, help_text="Дата і час додавання сенсора")

    def __str__(self):
        return f"{self.name} (Серійний номер: {self.sensor_type.serial_number})"
