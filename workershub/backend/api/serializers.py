from rest_framework import serializers
from .models import Worker, BookingRequest


class WorkerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Worker
        fields = [
            'id', 'name', 'passport_number', 'nationality', 'religion', 
            'profession', 'marital_status', 'age', 'status', 'image', 
            'image_url', 'created_at', 'experience_years', 'languages_spoken', 
            'skills', 'salary_expectation'
        ]
        read_only_fields = ['created_at']
        
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None


class WorkerListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for worker list view"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Worker
        fields = [
            'id', 'name', 'nationality', 'profession', 'age', 'status', 
            'image_url', 'experience_years', 'salary_expectation'
        ]
        
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None


class BookingRequestSerializer(serializers.ModelSerializer):
    worker_name = serializers.CharField(source='worker.name', read_only=True)
    worker_profession = serializers.CharField(source='worker.profession', read_only=True)
    worker_nationality = serializers.CharField(source='worker.nationality', read_only=True)
    
    class Meta:
        model = BookingRequest
        fields = [
            'id', 'worker', 'worker_name', 'worker_profession', 'worker_nationality',
            'full_name', 'phone_number', 'email', 'address', 'notes', 
            'status', 'created_at', 'updated_at', 'preferred_start_date', 
            'contract_duration'
        ]
        read_only_fields = ['created_at', 'updated_at']
        
    def validate_worker(self, value):
        if value.status != 'Available':
            raise serializers.ValidationError("This worker is not available for booking.")
        return value


class BookingRequestCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating booking requests"""
    
    class Meta:
        model = BookingRequest
        fields = [
            'worker', 'full_name', 'phone_number', 'email', 'address', 
            'notes', 'preferred_start_date', 'contract_duration'
        ]
        
    def validate_worker(self, value):
        if value.status != 'Available':
            raise serializers.ValidationError("This worker is not available for booking.")
        return value