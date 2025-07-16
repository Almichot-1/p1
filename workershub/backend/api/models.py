from django.db import models
from django.core.validators import RegexValidator


class Worker(models.Model):
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Booked', 'Booked'),
        ('On Leave', 'On Leave'),
    ]
    
    PROFESSION_CHOICES = [
        ('Housemaid', 'Housemaid'),
        ('Cleaner', 'Cleaner'),
        ('Cook', 'Cook'),
        ('Nanny', 'Nanny'),
        ('Caregiver', 'Caregiver'),
        ('Driver', 'Driver'),
        ('Gardener', 'Gardener'),
        ('Other', 'Other'),
    ]
    
    NATIONALITY_CHOICES = [
        ('Filipino', 'Filipino'),
        ('Indonesian', 'Indonesian'),
        ('Indian', 'Indian'),
        ('Sri Lankan', 'Sri Lankan'),
        ('Ethiopian', 'Ethiopian'),
        ('Kenyan', 'Kenyan'),
        ('Bangladeshi', 'Bangladeshi'),
        ('Nepalese', 'Nepalese'),
        ('Other', 'Other'),
    ]
    
    RELIGION_CHOICES = [
        ('Islam', 'Islam'),
        ('Christianity', 'Christianity'),
        ('Hinduism', 'Hinduism'),
        ('Buddhism', 'Buddhism'),
        ('Other', 'Other'),
    ]
    
    MARITAL_STATUS_CHOICES = [
        ('Single', 'Single'),
        ('Married', 'Married'),
        ('Divorced', 'Divorced'),
        ('Widowed', 'Widowed'),
    ]
    
    name = models.CharField(max_length=100)
    passport_number = models.CharField(
        max_length=20, 
        unique=True,
        validators=[RegexValidator(regex=r'^[A-Z0-9]{5,20}$', message='Enter a valid passport number')]
    )
    nationality = models.CharField(max_length=50, choices=NATIONALITY_CHOICES)
    religion = models.CharField(max_length=50, choices=RELIGION_CHOICES, blank=True, null=True)
    profession = models.CharField(max_length=50, choices=PROFESSION_CHOICES)
    marital_status = models.CharField(max_length=20, choices=MARITAL_STATUS_CHOICES, blank=True, null=True)
    age = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    image = models.ImageField(upload_to='workers/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Additional fields for better filtering
    experience_years = models.IntegerField(default=0, help_text='Years of experience')
    languages_spoken = models.CharField(max_length=200, blank=True, help_text='Languages spoken, separated by commas')
    skills = models.TextField(blank=True, help_text='Special skills or certifications')
    salary_expectation = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.name} - {self.profession} ({self.nationality})"


class BookingRequest(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='booking_requests')
    full_name = models.CharField(max_length=100)
    phone_number = models.CharField(
        max_length=20,
        validators=[RegexValidator(regex=r'^\+?1?\d{9,15}$', message='Enter a valid phone number')]
    )
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Additional fields
    preferred_start_date = models.DateField(blank=True, null=True)
    contract_duration = models.CharField(max_length=50, blank=True, null=True, help_text='e.g., 1 year, 6 months')
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.full_name} - {self.worker.name} ({self.status})"
