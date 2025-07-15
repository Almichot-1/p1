from rest_framework import serializers
from .models import Worker, BookingRequest

class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = '__all__'

class WorkerListSerializer(serializers.ModelSerializer):
    """Serializer for listing workers with minimal data"""
    class Meta:
        model = Worker
        fields = ['id', 'name', 'nationality', 'profession', 'age', 'status', 'image']

class BookingRequestSerializer(serializers.ModelSerializer):
    worker_name = serializers.CharField(source='worker.name', read_only=True)
    
    class Meta:
        model = BookingRequest
        fields = '__all__'

class BookingCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating booking requests"""
    class Meta:
        model = BookingRequest
        fields = ['worker', 'full_name', 'phone_number', 'notes']