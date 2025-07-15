from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import date, timedelta
from api.models import Worker, BookingRequest
import random


class Command(BaseCommand):
    help = 'Populate the database with sample data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Creating sample workers...'))
        
        # Sample worker data
        workers_data = [
            {
                'name': 'Maria Santos',
                'passport_number': 'A1234567',
                'nationality': 'Filipino',
                'religion': 'Christianity',
                'profession': 'Housemaid',
                'marital_status': 'Single',
                'age': 28,
                'experience_years': 5,
                'languages_spoken': 'English, Filipino, Arabic',
                'skills': 'Cleaning, Cooking, Childcare',
                'salary_expectation': 1200.00
            },
            {
                'name': 'Siti Nurhaliza',
                'passport_number': 'B2345678',
                'nationality': 'Indonesian',
                'religion': 'Islam',
                'profession': 'Cleaner',
                'marital_status': 'Married',
                'age': 32,
                'experience_years': 8,
                'languages_spoken': 'Indonesian, English',
                'skills': 'Deep cleaning, Window cleaning',
                'salary_expectation': 1000.00
            },
            {
                'name': 'Priya Sharma',
                'passport_number': 'C3456789',
                'nationality': 'Indian',
                'religion': 'Hinduism',
                'profession': 'Cook',
                'marital_status': 'Single',
                'age': 25,
                'experience_years': 3,
                'languages_spoken': 'Hindi, English',
                'skills': 'Indian cuisine, Vegetarian cooking',
                'salary_expectation': 1100.00
            },
            {
                'name': 'Lakshmi Perera',
                'passport_number': 'D4567890',
                'nationality': 'Sri Lankan',
                'religion': 'Buddhism',
                'profession': 'Nanny',
                'marital_status': 'Married',
                'age': 30,
                'experience_years': 6,
                'languages_spoken': 'Sinhala, English',
                'skills': 'Childcare, Educational activities',
                'salary_expectation': 1300.00
            },
            {
                'name': 'Fatima Ahmed',
                'passport_number': 'E5678901',
                'nationality': 'Ethiopian',
                'religion': 'Islam',
                'profession': 'Caregiver',
                'marital_status': 'Single',
                'age': 27,
                'experience_years': 4,
                'languages_spoken': 'Amharic, English',
                'skills': 'Elderly care, Medical assistance',
                'salary_expectation': 1400.00
            },
            {
                'name': 'Grace Wanjiku',
                'passport_number': 'F6789012',
                'nationality': 'Kenyan',
                'religion': 'Christianity',
                'profession': 'Housemaid',
                'marital_status': 'Single',
                'age': 24,
                'experience_years': 2,
                'languages_spoken': 'Swahili, English',
                'skills': 'Cleaning, Laundry, Ironing',
                'salary_expectation': 1000.00
            },
            {
                'name': 'Rashida Begum',
                'passport_number': 'G7890123',
                'nationality': 'Bangladeshi',
                'religion': 'Islam',
                'profession': 'Cook',
                'marital_status': 'Married',
                'age': 35,
                'experience_years': 10,
                'languages_spoken': 'Bengali, English',
                'skills': 'Bengali cuisine, Baking',
                'salary_expectation': 1200.00
            },
            {
                'name': 'Sunita Thapa',
                'passport_number': 'H8901234',
                'nationality': 'Nepalese',
                'religion': 'Hinduism',
                'profession': 'Cleaner',
                'marital_status': 'Single',
                'age': 26,
                'experience_years': 3,
                'languages_spoken': 'Nepali, English',
                'skills': 'Cleaning, Organizing',
                'salary_expectation': 950.00
            },
        ]
        
        # Create workers
        for worker_data in workers_data:
            worker, created = Worker.objects.get_or_create(
                passport_number=worker_data['passport_number'],
                defaults=worker_data
            )
            if created:
                self.stdout.write(f'Created worker: {worker.name}')
            else:
                self.stdout.write(f'Worker already exists: {worker.name}')
        
        # Create some booking requests
        self.stdout.write(self.style.SUCCESS('Creating sample booking requests...'))
        
        booking_requests_data = [
            {
                'full_name': 'Ahmed Al-Rashid',
                'phone_number': '+966501234567',
                'email': 'ahmed@example.com',
                'address': 'Riyadh, Saudi Arabia',
                'notes': 'Looking for a reliable housemaid for a family of 4',
                'preferred_start_date': date.today() + timedelta(days=7),
                'contract_duration': '1 year'
            },
            {
                'full_name': 'Sarah Johnson',
                'phone_number': '+966502345678',
                'email': 'sarah@example.com',
                'address': 'Jeddah, Saudi Arabia',
                'notes': 'Need someone experienced with children',
                'preferred_start_date': date.today() + timedelta(days=14),
                'contract_duration': '2 years'
            },
            {
                'full_name': 'Mohammed Abdullah',
                'phone_number': '+966503456789',
                'email': 'mohammed@example.com',
                'address': 'Dammam, Saudi Arabia',
                'notes': 'Require a cook who can prepare traditional meals',
                'preferred_start_date': date.today() + timedelta(days=21),
                'contract_duration': '6 months'
            },
        ]
        
        available_workers = Worker.objects.filter(status='Available')
        
        for i, booking_data in enumerate(booking_requests_data):
            if i < len(available_workers):
                booking_data['worker'] = available_workers[i]
                booking_request, created = BookingRequest.objects.get_or_create(
                    full_name=booking_data['full_name'],
                    worker=booking_data['worker'],
                    defaults=booking_data
                )
                if created:
                    self.stdout.write(f'Created booking request: {booking_request.full_name} -> {booking_request.worker.name}')
                else:
                    self.stdout.write(f'Booking request already exists: {booking_request.full_name}')
        
        self.stdout.write(self.style.SUCCESS('Sample data population completed!'))
        self.stdout.write(f'Total workers: {Worker.objects.count()}')
        self.stdout.write(f'Total booking requests: {BookingRequest.objects.count()}')