from django.contrib import admin
from .models import Worker, BookingRequest

@admin.register(Worker)
class WorkerAdmin(admin.ModelAdmin):
    list_display = ['name', 'profession', 'nationality', 'age', 'status', 'created_at']
    list_filter = ['status', 'nationality', 'profession', 'marital_status']
    search_fields = ['name', 'passport_number', 'nationality', 'profession']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'passport_number', 'nationality', 'religion', 'age', 'marital_status')
        }),
        ('Professional Information', {
            'fields': ('profession', 'status', 'image')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )

@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'worker', 'phone_number', 'status', 'created_at']
    list_filter = ['status', 'created_at', 'worker__profession', 'worker__nationality']
    search_fields = ['full_name', 'phone_number', 'worker__name']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('full_name', 'phone_number')
        }),
        ('Booking Details', {
            'fields': ('worker', 'notes', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('worker')
