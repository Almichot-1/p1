from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

from .models import Worker, BookingRequest
from .serializers import (
    WorkerSerializer,
    WorkerListSerializer,
    BookingRequestSerializer,
    BookingCreateSerializer,
)

class WorkerListView(generics.ListAPIView):
    """List all workers with filtering and search"""
    queryset = Worker.objects.all()
    serializer_class = WorkerListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['nationality', 'profession', 'status', 'marital_status']
    search_fields = ['name', 'nationality', 'profession']
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by age range
        min_age = self.request.query_params.get('min_age')
        max_age = self.request.query_params.get('max_age')
        
        if min_age:
            queryset = queryset.filter(age__gte=min_age)
        if max_age:
            queryset = queryset.filter(age__lte=max_age)
            
        return queryset

class WorkerDetailView(generics.RetrieveAPIView):
    """Retrieve a specific worker"""
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [AllowAny]

class BookingRequestCreateView(generics.CreateAPIView):
    """Create a new booking request"""
    queryset = BookingRequest.objects.all()
    serializer_class = BookingCreateSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        serializer.save()

class BookingRequestListView(generics.ListAPIView):
    """List all booking requests (Admin only)"""
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    # permission_classes = [IsAuthenticated]  # Uncomment for admin-only access
    permission_classes = [AllowAny]  # For demo purposes
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'worker']

class BookingRequestUpdateView(generics.UpdateAPIView):
    """Update booking request status (Admin only)"""
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    # permission_classes = [IsAuthenticated]  # Uncomment for admin-only access
    permission_classes = [AllowAny]  # For demo purposes
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        if 'status' in request.data:
            instance.status = request.data['status']
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        return Response({"error": "Status field is required"}, status=status.HTTP_400_BAD_REQUEST)
