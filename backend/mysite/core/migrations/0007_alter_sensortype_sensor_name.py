# Generated by Django 5.1.3 on 2024-11-17 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_usersensor_sensor_value'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensortype',
            name='sensor_name',
            field=models.CharField(help_text='Назва типу сенсора', max_length=50),
        ),
    ]
