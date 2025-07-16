import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiService, formatError } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    address: '',
    preferred_start_date: '',
    contract_duration: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchWorker();
  }, [id]);

  const fetchWorker = async () => {
    try {
      const data = await apiService.getWorker(id);
      setWorker(data);
      
      if (data.status !== 'Available') {
        setError(t('bookingForm.workerNotAvailable', { defaultValue: 'This worker is not available for booking.' }));
      }
    } catch (error) {
      console.error('Error fetching worker:', error);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = t('bookingForm.validation.required');
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = t('bookingForm.validation.required');
    } else if (!/^\+?[\d\s-()]{9,20}$/.test(formData.phone_number)) {
      newErrors.phone_number = t('bookingForm.validation.invalidPhone');
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('bookingForm.validation.invalidEmail');
    }

    if (!formData.address.trim()) {
      newErrors.address = t('bookingForm.validation.required');
    }

    if (!formData.contract_duration) {
      newErrors.contract_duration = t('bookingForm.validation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const bookingData = {
        ...formData,
        worker: worker.id,
      };

      await apiService.createBooking(bookingData);
      setSuccess(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      setError(formatError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const getProfessionText = (profession) => {
    const professionMap = {
      'Housemaid': t('professions.housemaid'),
      'Cleaner': t('professions.cleaner'),
      'Cook': t('professions.cook'),
      'Nanny': t('professions.nanny'),
      'Caregiver': t('professions.caregiver'),
      'Driver': t('professions.driver'),
      'Gardener': t('professions.gardener'),
      'Other': t('professions.other'),
    };
    return professionMap[profession] || profession;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || t('common.error')}
          </h1>
          <button 
            onClick={() => navigate('/workers')}
            className="btn-primary"
          >
            {t('workerProfile.backToList')}
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('bookingForm.success')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('bookingForm.successMessage', { defaultValue: 'We will contact you soon to confirm your booking.' })}
          </p>
          <button 
            onClick={() => navigate('/workers')}
            className="btn-primary"
          >
            {t('workers.viewMore', { defaultValue: 'View More Workers' })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(`/workers/${worker.id}`)}
            className="flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('common.back', { defaultValue: 'Back' })}
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('bookingForm.title')}</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Worker Info */}
            <div className="md:w-1/3 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t('bookingForm.workerInfo')}
              </h2>
              
              <div className="flex items-center mb-4">
                <img
                  src={worker.image_url || '/api/placeholder/80/80'}
                  alt={worker.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/80/80';
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                  <p className="text-sm text-gray-600">{getProfessionText(worker.profession)}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('workerProfile.age')}:</span>
                  <span className="font-medium">{worker.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('workerProfile.experience')}:</span>
                  <span className="font-medium">
                    {t('workerCard.yearsExp', { count: worker.experience_years })}
                  </span>
                </div>
                {worker.salary_expectation && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('workerProfile.salary')}:</span>
                    <span className="font-medium text-primary-600">
                      {worker.salary_expectation.toLocaleString()} {t('workerCard.currency')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            <div className="md:w-2/3 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('bookingForm.personalInfo')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('bookingForm.fullName')} *
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        placeholder={t('bookingForm.fullNamePlaceholder')}
                        className={`input-field ${errors.full_name ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.full_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('bookingForm.phone')} *
                      </label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder={t('bookingForm.phonePlaceholder')}
                        className={`input-field ${errors.phone_number ? 'border-red-500' : ''}`}
                        required
                      />
                      {errors.phone_number && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('bookingForm.email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('bookingForm.emailPlaceholder')}
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('bookingForm.startDate')}
                      </label>
                      <input
                        type="date"
                        name="preferred_start_date"
                        value={formData.preferred_start_date}
                        onChange={handleInputChange}
                        className="input-field"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('bookingForm.address')} *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t('bookingForm.addressPlaceholder')}
                      rows={3}
                      className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                      required
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>

                {/* Booking Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('bookingForm.bookingDetails')}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t('bookingForm.duration')} *
                      </label>
                      <select
                        name="contract_duration"
                        value={formData.contract_duration}
                        onChange={handleInputChange}
                        className={`select-field ${errors.contract_duration ? 'border-red-500' : ''}`}
                        required
                      >
                        <option value="">Select duration</option>
                        <option value="6 months">{t('bookingForm.durationOptions.6months')}</option>
                        <option value="1 year">{t('bookingForm.durationOptions.1year')}</option>
                        <option value="2 years">{t('bookingForm.durationOptions.2years')}</option>
                        <option value="negotiable">{t('bookingForm.durationOptions.negotiable')}</option>
                      </select>
                      {errors.contract_duration && (
                        <p className="text-red-500 text-sm mt-1">{errors.contract_duration}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('bookingForm.notes')}
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder={t('bookingForm.notesPlaceholder')}
                      rows={4}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1 py-3 text-lg"
                  >
                    {submitting ? t('bookingForm.loading') : t('bookingForm.submit')}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/workers/${worker.id}`)}
                    className="btn-secondary flex-1 py-3 text-lg"
                  >
                    {t('bookingForm.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;