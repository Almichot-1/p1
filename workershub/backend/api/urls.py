from django.urls import path
from . import views

urlpatterns = [
    path('workers/', views.WorkerListView.as_view(), name='worker-list'),
    path('workers/<int:pk>/', views.WorkerDetailView.as_view(), name='worker-detail'),
    path('bookings/', views.BookingRequestCreateView.as_view(), name='booking-create'),
    path('bookings/list/', views.BookingRequestListView.as_view(), name='booking-list'),
    path('bookings/<int:pk>/', views.BookingRequestUpdateView.as_view(), name='booking-update'),
]