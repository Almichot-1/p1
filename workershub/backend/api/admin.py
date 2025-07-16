from django.contrib import admin
from .models import Worker, BookingRequest


@admin.register(Worker)
class WorkerAdmin(admin.ModelAdmin):
    list_display = ['name', 'profession', 'nationality', 'age', 'status', 'created_at']
    list_filter = ['profession', 'nationality', 'status', 'religion', 'marital_status', 'created_at']
    search_fields = ['name', 'passport_number', 'nationality', 'profession']
    readonly_fields = ['created_at']
    list_editable = ['status']
    list_per_page = 20
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'passport_number', 'age', 'image')
        }),
        ('Personal Details', {
            'fields': ('nationality', 'religion', 'marital_status')
        }),
        ('Professional Information', {
            'fields': ('profession', 'experience_years', 'languages_spoken', 'skills', 'salary_expectation')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        })
    )


@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'worker', 'status', 'phone_number', 'created_at']
    list_filter = ['status', 'created_at', 'worker__profession', 'worker__nationality']
    search_fields = ['full_name', 'phone_number', 'email', 'worker__name']
    readonly_fields = ['created_at', 'updated_at']
    list_editable = ['status']
    list_per_page = 20
    
    fieldsets = (
        ('Client Information', {
            'fields': ('full_name', 'phone_number', 'email', 'address')
        }),
        ('Booking Details', {
            'fields': ('worker', 'preferred_start_date', 'contract_duration', 'notes')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('worker')
