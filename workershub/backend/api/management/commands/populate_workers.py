from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from api.models import Worker
import random

class Command(BaseCommand):
    help = 'Populate the database with sample workers'
    
    def handle(self, *args, **options):
        # Sample data
        nationalities = ['Philippines', 'Indonesia', 'Sri Lanka', 'Bangladesh', 'India', 'Ethiopia', 'Kenya', 'Uganda']
        professions = ['Housemaid', 'Cleaning Staff', 'Nanny', 'Cook', 'Elderly Care', 'Gardener', 'Driver']
        religions = ['Christian', 'Muslim', 'Buddhist', 'Hindu', 'Other']
        marital_statuses = ['single', 'married', 'divorced', 'widowed']
        
        names = [
            'Maria Santos', 'John Doe', 'Fatima Ahmed', 'Priya Sharma', 'Sarah Johnson',
            'Ahmed Hassan', 'Linda Williams', 'James Brown', 'Anna Garcia', 'David Miller',
            'Grace Mutua', 'Peter Ochieng', 'Mary Wanjiku', 'Joseph Kiprotich', 'Rose Achieng',
            'Siti Nurhaliza', 'Ahmad Rahman', 'Dewi Sartika', 'Bambang Sutrisno', 'Indira Sari',
            'Kumari Perera', 'Nimal Silva', 'Chamali Fernando', 'Ruwan Jayawardena', 'Sanduni Karunaratne'
        ]
        
        # Clear existing workers
        Worker.objects.all().delete()
        
        workers_created = 0
        
        for i in range(25):  # Create 25 sample workers
            name = random.choice(names)
            nationality = random.choice(nationalities)
            profession = random.choice(professions)
            religion = random.choice(religions)
            marital_status = random.choice(marital_statuses)
            age = random.randint(22, 45)
            status = random.choice(['available', 'available', 'available', 'booked', 'on_leave'])  # More available workers
            
            worker = Worker.objects.create(
                name=name,
                passport_number=f"P{random.randint(1000000, 9999999)}",
                nationality=nationality,
                religion=religion,
                profession=profession,
                marital_status=marital_status,
                age=age,
                status=status,
                # Note: For demo purposes, we're not adding actual images
                # In a real implementation, you would handle image uploads
            )
            
            workers_created += 1
            
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {workers_created} sample workers')
        )