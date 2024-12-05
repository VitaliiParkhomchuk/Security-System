from rest_framework import serializers
from user.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    """_summary_

    Args:
        serializers (_type_): _description_
    """

    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
            """_summary_

            Args:
                validated_data (_type_): _description_
            """
            user = CustomUser(email=validated_data['email'], name=validated_data['name'])

            # Hashing password
            user.set_password(validated_data['password'])
            user.save()
            return user