from django.shortcuts import render
from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from .models import Worker, BookingRequest
from .serializers import (
    WorkerSerializer, WorkerListSerializer, 
    BookingRequestSerializer, BookingRequestCreateSerializer
)


class WorkerListView(generics.ListAPIView):
    """List all workers with filtering and search capabilities"""
    queryset = Worker.objects.all()
    serializer_class = WorkerListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['profession', 'nationality', 'status', 'religion', 'marital_status']
    search_fields = ['name', 'profession', 'nationality', 'skills', 'languages_spoken']
    ordering_fields = ['name', 'age', 'created_at', 'experience_years', 'salary_expectation']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Custom filtering
        age_min = self.request.query_params.get('age_min')
        age_max = self.request.query_params.get('age_max')
        experience_min = self.request.query_params.get('experience_min')
        
        if age_min:
            queryset = queryset.filter(age__gte=age_min)
        if age_max:
            queryset = queryset.filter(age__lte=age_max)
        if experience_min:
            queryset = queryset.filter(experience_years__gte=experience_min)
            
        return queryset


class WorkerDetailView(generics.RetrieveAPIView):
    """Retrieve a specific worker by ID"""
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer


class BookingRequestListView(generics.ListAPIView):
    """List all booking requests (admin only)"""
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'worker__profession', 'worker__nationality']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']


class BookingRequestCreateView(generics.CreateAPIView):
    """Create a new booking request"""
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestCreateSerializer
    
    def perform_create(self, serializer):
        serializer.save()


class BookingRequestDetailView(generics.RetrieveUpdateAPIView):
    """Retrieve and update a specific booking request"""
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    
    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            # Only allow status updates
            return BookingRequestSerializer
        return BookingRequestSerializer


@api_view(['GET'])
def worker_stats(request):
    """Get worker statistics for dashboard"""
    total_workers = Worker.objects.count()
    available_workers = Worker.objects.filter(status='Available').count()
    booked_workers = Worker.objects.filter(status='Booked').count()
    on_leave_workers = Worker.objects.filter(status='On Leave').count()
    
    profession_stats = {}
    for profession, _ in Worker.PROFESSION_CHOICES:
        profession_stats[profession] = Worker.objects.filter(profession=profession).count()
    
    nationality_stats = {}
    for nationality, _ in Worker.NATIONALITY_CHOICES:
        nationality_stats[nationality] = Worker.objects.filter(nationality=nationality).count()
    
    return Response({
        'total_workers': total_workers,
        'available_workers': available_workers,
        'booked_workers': booked_workers,
        'on_leave_workers': on_leave_workers,
        'profession_stats': profession_stats,
        'nationality_stats': nationality_stats
    })


@api_view(['GET'])
def booking_stats(request):
    """Get booking request statistics"""
    total_requests = BookingRequest.objects.count()
    pending_requests = BookingRequest.objects.filter(status='Pending').count()
    approved_requests = BookingRequest.objects.filter(status='Approved').count()
    rejected_requests = BookingRequest.objects.filter(status='Rejected').count()
    
    return Response({
        'total_requests': total_requests,
        'pending_requests': pending_requests,
        'approved_requests': approved_requests,
        'rejected_requests': rejected_requests
    })


@api_view(['GET'])
def filter_choices(request):
    """Get all available filter choices for frontend"""
    return Response({
        'professions': Worker.PROFESSION_CHOICES,
        'nationalities': Worker.NATIONALITY_CHOICES,
        'religions': Worker.RELIGION_CHOICES,
        'marital_statuses': Worker.MARITAL_STATUS_CHOICES,
        'worker_statuses': Worker.STATUS_CHOICES,
        'booking_statuses': BookingRequest.STATUS_CHOICES
    })
