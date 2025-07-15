from django.urls import path
from . import views

urlpatterns = [
    # Worker endpoints
    path('workers/', views.WorkerListView.as_view(), name='worker-list'),
    path('workers/<int:pk>/', views.WorkerDetailView.as_view(), name='worker-detail'),
    
    # Booking endpoints
    path('bookings/', views.BookingRequestListView.as_view(), name='booking-list'),
    path('bookings/create/', views.BookingRequestCreateView.as_view(), name='booking-create'),
    path('bookings/<int:pk>/', views.BookingRequestDetailView.as_view(), name='booking-detail'),
    
    # Statistics endpoints
    path('stats/workers/', views.worker_stats, name='worker-stats'),
    path('stats/bookings/', views.booking_stats, name='booking-stats'),
    
    # Filter choices endpoint
    path('choices/', views.filter_choices, name='filter-choices'),
]