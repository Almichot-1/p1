# 📘 WorkersHub - Complete Project Documentation

## 🏷️ Project Overview

**WorkersHub** is a full-stack web platform for listing, managing, and booking domestic workers (e.g., housemaids, cleaning staff). The platform allows employers to:

- Browse worker profiles with detailed information
- Filter/search workers by nationality, profession, age, status, etc.
- View detailed worker information
- Book workers via a booking form
- Multilingual support (Arabic/English)
- Admin dashboard for managing workers and bookings

## ⚙️ Technology Stack

### Backend
- **Django** 5.2.4
- **Django REST Framework** 3.16.0
- **MySQL** / SQLite (configurable)
- **Django Admin** for content management
- **django-cors-headers** for CORS handling
- **django-filter** for advanced filtering
- **Pillow** for image handling

### Frontend
- **React** 18+ with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for HTTP requests
- **i18next** for multilingual support (Arabic/English)

## 🗂️ Project Structure

```
workershub/
├── backend/
│   ├── api/
│   │   ├── models.py          # Worker & BookingRequest models
│   │   ├── views.py           # API endpoints
│   │   ├── serializers.py     # DRF serializers
│   │   ├── urls.py            # API URL patterns
│   │   └── admin.py           # Django admin configuration
│   ├── backend/
│   │   ├── settings.py        # Django settings
│   │   └── urls.py            # Main URL configuration
│   ├── media/                 # Uploaded worker images
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── api.js            # API service
│   │   ├── i18n.js           # Internationalization config
│   │   └── App.jsx           # Main App component
│   ├── public/
│   └── package.json          # Frontend dependencies
└── README.md                 # This file
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd workershub/backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env file with your settings
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Populate with sample data:**
   ```bash
   python manage.py populate_workers
   ```

8. **Start Django server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd workershub/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Django Admin: http://localhost:8000/admin

## 📋 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/workers/` | GET | List all workers with filtering |
| `/api/workers/{id}/` | GET | Get specific worker details |
| `/api/bookings/` | POST | Create booking request |
| `/api/bookings/list/` | GET | List all bookings (admin) |
| `/api/bookings/{id}/` | PATCH | Update booking status (admin) |

### API Filtering Options

Workers can be filtered by:
- `search` - Search in name, nationality, profession
- `nationality` - Filter by nationality
- `profession` - Filter by profession
- `status` - Filter by availability status
- `min_age` / `max_age` - Filter by age range

Example:
```
GET /api/workers/?nationality=Philippines&profession=Housemaid&status=available
```

## 🗃️ Database Models

### Worker Model
- `name` - Worker's full name
- `passport_number` - Unique passport number
- `nationality` - Worker's nationality
- `religion` - Worker's religion (optional)
- `profession` - Worker's profession
- `marital_status` - Marital status (optional)
- `age` - Worker's age (18-65)
- `status` - Availability status (available/booked/on_leave)
- `image` - Worker's profile image
- `created_at` - Registration timestamp

### BookingRequest Model
- `worker` - Foreign key to Worker
- `full_name` - Customer's full name
- `phone_number` - Customer's phone number
- `notes` - Additional notes/requirements
- `status` - Booking status (pending/approved/rejected)
- `created_at` - Booking request timestamp

## 🌐 Frontend Pages

### Public Pages
- **Homepage** (`/`) - Hero section with call-to-action
- **Workers** (`/workers`) - List all workers with filtering
- **Worker Profile** (`/workers/{id}`) - Detailed worker information
- **Booking Form** (`/book/{id}`) - Submit booking request
- **Contact** (`/contact`) - Contact information

### Components
- **Navbar** - Navigation with language switcher
- **WorkerCard** - Worker summary card
- **FilterBar** - Advanced filtering interface
- **LoadingSpinner** - Loading state indicator
- **Footer** - Site footer with links

## 🌍 Multilingual Support

The application supports:
- **English** (default)
- **Arabic** with RTL support

### Language Features
- Auto-detection of browser language
- Language switcher in navbar
- RTL layout for Arabic
- Translated content for all UI elements
- Arabic font (Cairo) integration

## 🔧 Admin Features

Access Django admin at `/admin/` to:
- Add/edit/delete workers
- Manage worker images
- View and update booking requests
- Filter and search functionality
- Bulk operations

### Admin Credentials
- Username: `admin`
- Password: `admin123`

## 🚀 Deployment Guide

### Backend Deployment (Example with Railway)

1. **Prepare for production:**
   ```bash
   # Update settings.py for production
   DEBUG = False
   ALLOWED_HOSTS = ['your-domain.com']
   ```

2. **Database setup:**
   ```bash
   # For MySQL in production
   pip install mysqlclient
   # Update DATABASES in settings.py
   ```

3. **Static files:**
   ```bash
   python manage.py collectstatic
   ```

### Frontend Deployment (Example with Vercel)

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Update API base URL:**
   ```javascript
   // Update API_BASE_URL in src/api.js
   const API_BASE_URL = 'https://your-backend-domain.com/api';
   ```

## 📱 Features

### ✅ Implemented Features
- Worker listing with pagination
- Advanced filtering and search
- Detailed worker profiles
- Booking form with validation
- Multilingual support (EN/AR)
- Responsive design
- Django admin interface
- RESTful API
- Image upload support
- Status management

### 🔮 Future Enhancements
- Worker video profiles
- WhatsApp integration
- Payment processing
- Worker rating system
- Email notifications
- Advanced search with maps
- Mobile app
- Real-time chat

## 🛠️ Development

### Adding New Features

1. **Backend (Django):**
   - Add new models in `api/models.py`
   - Create serializers in `api/serializers.py`
   - Add views in `api/views.py`
   - Update URLs in `api/urls.py`

2. **Frontend (React):**
   - Add components in `src/components/`
   - Create pages in `src/pages/`
   - Update routes in `src/App.jsx`
   - Add translations in `src/i18n.js`

### Testing

```bash
# Backend tests
python manage.py test

# Frontend tests
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support and questions:
- Email: info@workershub.com
- Phone: +966 11 123 4567

---

**WorkersHub** - Connecting families with skilled domestic workers across the region.