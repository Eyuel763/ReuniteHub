from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Alert
from .serializers import AlertSerializer
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
User = get_user_model()

class SendAlertView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AlertSerializer(data=request.data)
        if serializer.is_valid():
            alert = serializer.save(created_by=request.user)
            nearby_users = User.objects.filter(profile__location__iexact=alert.location)

            for user in nearby_users:
                send_mail(
                    subject=f" New Alert in {alert.location}!",
                    message=f"Alert: {alert.message}\nFrom: {request.user.email}",
                    from_email='your@email.com',
                    recipient_list=[user.email ],
                    fail_silently=False,
                )
                print(f"Email sent to {user.email}")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        alerts = Alert.objects.all()  
        serializer = AlertSerializer(alerts, many=True)
        return Response(serializer.data)

