from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Worker(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('booked', 'Booked'),
        ('on_leave', 'On Leave'),
    ]
    
    MARITAL_STATUS_CHOICES = [
        ('single', 'Single'),
        ('married', 'Married'),
        ('divorced', 'Divorced'),
        ('widowed', 'Widowed'),
    ]
    
    name = models.CharField(max_length=100)
    passport_number = models.CharField(max_length=50, unique=True)
    nationality = models.CharField(max_length=50)
    religion = models.CharField(max_length=50, null=True, blank=True)
    profession = models.CharField(max_length=100)
    marital_status = models.CharField(max_length=20, choices=MARITAL_STATUS_CHOICES, null=True, blank=True)
    age = models.IntegerField(validators=[MinValueValidator(18), MaxValueValidator(65)])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    image = models.ImageField(upload_to='workers/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.profession}"
    
    class Meta:
        ordering = ['-created_at']

class BookingRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='bookings')
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.full_name} - {self.worker.name}"
    
    class Meta:
        ordering = ['-created_at']
