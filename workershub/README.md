# 🏠 WorkersHub - Complete Domestic Worker Rental Platform

## 📋 Project Overview

**WorkersHub** is a full-stack web platform for listing, managing, and booking domestic workers (housemaids, cleaning staff, etc.). Inspired by almshl.sa, the platform provides a comprehensive solution for employers to find and book qualified domestic workers.

### ✨ Key Features

- 🔍 **Advanced Search & Filtering** - Find workers by profession, nationality, age, experience, religion, and more
- 🌐 **Multilingual Support** - Full Arabic/English interface with RTL support
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 👥 **Worker Profiles** - Detailed information including skills, experience, and availability
- 📝 **Booking System** - Complete booking form with validation and status tracking
- 🎨 **Modern UI/UX** - Beautiful, clean interface with smooth animations
- 🔐 **Admin Panel** - Django admin interface for managing workers and bookings

---

## 🏗️ Technology Stack

### Backend
- **Django** - Web framework
- **Django REST Framework** - API development
- **MySQL/SQLite** - Database (SQLite for development, MySQL for production)
- **Django Admin** - Admin interface
- **django-cors-headers** - CORS handling
- **django-filter** - Advanced filtering
- **Pillow** - Image processing

### Frontend
- **React.js** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **i18next** - Internationalization
- **React i18next** - React integration for i18n

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Create virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate     # Windows
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database settings
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

6. **Load sample data:**
   ```bash
   python manage.py populate_sample_data
   ```

7. **Start server:**
   ```bash
   python manage.py runserver 8000
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Access application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api
   - Admin Panel: http://localhost:8000/admin

---

## 📁 Project Structure

```
workershub/
├── backend/
│   ├── api/
│   │   ├── models.py          # Worker & BookingRequest models
│   │   ├── views.py           # API endpoints
│   │   ├── serializers.py     # DRF serializers
│   │   ├── urls.py            # API routes
│   │   ├── admin.py           # Admin configuration
│   │   └── management/
│   │       └── commands/
│   │           └── populate_sample_data.py
│   ├── backend/
│   │   ├── settings.py        # Django settings
│   │   └── urls.py            # Main URL configuration
│   ├── media/                 # Uploaded images
│   ├── .env                   # Environment variables
│   ├── requirements.txt       # Python dependencies
│   └── manage.py              # Django management script
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── WorkerCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Workers.jsx
│   │   │   ├── WorkerProfile.jsx
│   │   │   ├── BookingForm.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── i18n/              # Internationalization
│   │   │   ├── index.js
│   │   │   └── locales/
│   │   │       ├── en.json
│   │   │       └── ar.json
│   │   ├── utils/
│   │   │   └── api.js         # API service
│   │   ├── App.jsx            # Main App component
│   │   ├── index.css          # Tailwind CSS
│   │   └── main.jsx           # React entry point
│   ├── public/                # Static assets
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── package.json           # Node.js dependencies
│   └── vite.config.js         # Vite configuration
└── README.md                  # This file
```

---

## 🔌 API Endpoints

### Workers
- `GET /api/workers/` - List all workers (with filtering)
- `GET /api/workers/{id}/` - Get worker details
- `GET /api/choices/` - Get filter choices

### Bookings
- `POST /api/bookings/create/` - Create booking request
- `GET /api/bookings/` - List bookings (admin only)
- `PUT /api/bookings/{id}/` - Update booking status

### Statistics
- `GET /api/stats/workers/` - Worker statistics
- `GET /api/stats/bookings/` - Booking statistics

---

## 🎨 Pages & Components

### Pages
- **Home** (`/`) - Hero section with statistics and featured workers
- **Workers** (`/workers`) - Worker listing with advanced filtering
- **Worker Profile** (`/workers/{id}`) - Detailed worker information
- **Booking Form** (`/book/{id}`) - Complete booking form
- **Contact** (`/contact`) - Contact information and form
- **404** (`/*`) - Not found page

### Components
- **Navbar** - Navigation with language switching
- **WorkerCard** - Worker display card with actions
- **LoadingSpinner** - Loading state component
- **Footer** - Site footer with links

---

## 🌐 Internationalization

The application supports both **English** and **Arabic** languages with:
- Complete UI translation
- RTL support for Arabic
- Language persistence
- Smooth language switching

---

## 🎭 Sample Data

The application includes sample data:
- **8 Workers** with diverse profiles
- **3 Booking Requests** with different statuses
- **Admin User** (username: admin, password: admin123)

---

## 🚀 Deployment

### Backend (Django)
- **Production databases**: MySQL 8+
- **Hosting options**: Render, Railway, DigitalOcean
- **Environment variables**: Configure database, secret key, debug mode
- **Static files**: Configure for production serving

### Frontend (React)
- **Build command**: `npm run build`
- **Hosting options**: Vercel, Netlify, AWS S3
- **Environment variables**: Set API base URL

---

## 📊 Features in Detail

### Advanced Filtering
- Profession-based filtering
- Nationality selection
- Age range filtering
- Experience level filtering
- Religion-based filtering
- Marital status filtering
- Real-time search

### Booking System
- Complete booking form with validation
- Worker availability checking
- Email and phone validation
- Success and error handling
- Admin booking management

### Responsive Design
- Mobile-first approach
- Tablet-optimized layouts
- Desktop experience
- Touch-friendly interfaces

---

## 🔧 Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
USE_SQLITE=True
# For MySQL (production)
DB_NAME=workershub_db
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

## 📧 Support

For support or questions, please contact:
- Email: info@workershub.com
- Phone: +966 11 123 4567

---

## 🙏 Acknowledgments

- Inspired by almshl.sa
- Built with modern web technologies
- Designed for the Saudi market
- Multilingual support for Arabic and English users

---

**Built with ❤️ by the WorkersHub Team**