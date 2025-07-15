import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { workerApi, bookingApi } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    notes: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchWorker();
  }, [id]);

  const fetchWorker = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await workerApi.getWorker(id);
      setWorker(response.data);
      
      // Check if worker is available
      if (response.data.status !== 'available') {
        setError('This worker is not available for booking.');
      }
    } catch (error) {
      setError(t('error') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const bookingData = {
        ...formData,
        worker: parseInt(id),
      };

      await bookingApi.createBooking(bookingData);
      setSuccess(true);
      
      // Redirect to workers page after 3 seconds
      setTimeout(() => {
        navigate('/workers');
      }, 3000);
    } catch (error) {
      setError(t('bookingError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !worker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/workers" className="btn-primary">
            Back to Workers
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Submitted!
          </h2>
          <p className="text-gray-600 mb-4">
            {t('bookingSuccess')}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            We'll contact you soon to confirm your booking details.
          </p>
          <Link to="/workers" className="btn-primary">
            Browse More Workers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-600">
                {t('home')}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/workers" className="hover:text-primary-600">
                {t('workers')}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to={`/workers/${id}`} className="hover:text-primary-600">
                {worker?.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800">{t('bookingForm')}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Worker Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Worker Details
            </h2>
            
            {worker && (
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                  {worker.image ? (
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{worker.name}</h3>
                  <p className="text-gray-600">{worker.profession}</p>
                  <p className="text-sm text-gray-500">{worker.nationality} • {worker.age} {t('yearsOld')}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                Booking Information
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• We'll contact you within 24 hours</li>
                <li>• Booking confirmation required</li>
                <li>• Service fees may apply</li>
                <li>• Cancellation policy applies</li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {t('bookingForm')}
            </h2>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('phoneNumber')} *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="+966 50 123 4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('notes')}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  className="form-input"
                  placeholder="Any special requirements or notes..."
                />
              </div>

              <div className="flex space-x-4">
                <Link
                  to={`/workers/${id}`}
                  className="btn-secondary flex-1 text-center"
                >
                  {t('back')}
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="ml-2">Submitting...</span>
                    </>
                  ) : (
                    t('submitBooking')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;