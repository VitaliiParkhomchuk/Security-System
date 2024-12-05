from django.shortcuts import render
from .serializers import CustomUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterUserView(APIView):
    """_summary_

    Args:
        APIView (_type_): _description_
    """
    
    def post(self, request) -> Response:
        """_summary_

        Args:
            request (_type_): _description_

        Returns:
            Response: _description_
        """

        serializer = CustomUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': serializer.data
        })
