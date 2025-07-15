import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

// Components
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Workers from './pages/Workers';
import WorkerProfile from './pages/WorkerProfile';
import BookingForm from './pages/BookingForm';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
  const { i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';
  
  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/workers/:id" element={<WorkerProfile />} />
            <Route path="/book/:id" element={<BookingForm />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
