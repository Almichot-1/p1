import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiService } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorker();
  }, [id]);

  const fetchWorker = async () => {
    try {
      const data = await apiService.getWorker(id);
      setWorker(data);
    } catch (error) {
      console.error('Error fetching worker:', error);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available':
        return 'status-available';
      case 'Booked':
        return 'status-booked';
      case 'On Leave':
        return 'status-on-leave';
      default:
        return 'status-available';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Available':
        return t('status.available');
      case 'Booked':
        return t('status.booked');
      case 'On Leave':
        return t('status.onLeave');
      default:
        return t('status.available');
    }
  };

  const getTranslatedValue = (field, value) => {
    const translations = {
      profession: {
        'Housemaid': t('professions.housemaid'),
        'Cleaner': t('professions.cleaner'),
        'Cook': t('professions.cook'),
        'Nanny': t('professions.nanny'),
        'Caregiver': t('professions.caregiver'),
        'Driver': t('professions.driver'),
        'Gardener': t('professions.gardener'),
        'Other': t('professions.other'),
      },
      nationality: {
        'Filipino': t('nationalities.filipino'),
        'Indonesian': t('nationalities.indonesian'),
        'Indian': t('nationalities.indian'),
        'Sri Lankan': t('nationalities.sriLankan'),
        'Ethiopian': t('nationalities.ethiopian'),
        'Kenyan': t('nationalities.kenyan'),
        'Bangladeshi': t('nationalities.bangladeshi'),
        'Nepalese': t('nationalities.nepalese'),
        'Other': t('nationalities.other'),
      },
      religion: {
        'Islam': t('religions.islam'),
        'Christianity': t('religions.christianity'),
        'Hinduism': t('religions.hinduism'),
        'Buddhism': t('religions.buddhism'),
        'Other': t('religions.other'),
      },
      maritalStatus: {
        'Single': t('maritalStatus.single'),
        'Married': t('maritalStatus.married'),
        'Divorced': t('maritalStatus.divorced'),
        'Widowed': t('maritalStatus.widowed'),
      },
    };
    return translations[field]?.[value] || value;
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
          <Link to="/workers" className="btn-primary">
            {t('workerProfile.backToList')}
          </Link>
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
            onClick={() => navigate('/workers')}
            className="flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('workerProfile.backToList')}
          </button>
        </div>

        {/* Worker Profile */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Worker Image */}
            <div className="md:w-1/3">
              <img
                src={worker.image_url || '/api/placeholder/400/400'}
                alt={worker.name}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/400';
                }}
              />
            </div>

            {/* Worker Details */}
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{worker.name}</h1>
                  <p className="text-xl text-gray-600">{getTranslatedValue('profession', worker.profession)}</p>
                </div>
                <span className={`${getStatusClass(worker.status)} text-sm`}>
                  {getStatusText(worker.status)}
                </span>
              </div>

              {/* Basic Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('workerProfile.basicInfo')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">{t('workerProfile.age')}:</span>
                    <span className="ml-2 font-medium">{worker.age} years</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t('workerProfile.nationality')}:</span>
                    <span className="ml-2 font-medium">{getTranslatedValue('nationality', worker.nationality)}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t('workerProfile.experience')}:</span>
                    <span className="ml-2 font-medium">
                      {t('workerCard.yearsExp', { count: worker.experience_years })}
                    </span>
                  </div>
                  {worker.salary_expectation && (
                    <div>
                      <span className="text-sm text-gray-600">{t('workerProfile.salary')}:</span>
                      <span className="ml-2 font-medium text-primary-600">
                        {worker.salary_expectation.toLocaleString()} {t('workerCard.currency')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('workerProfile.personalDetails')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {worker.religion && (
                    <div>
                      <span className="text-sm text-gray-600">{t('workerProfile.religion')}:</span>
                      <span className="ml-2 font-medium">{getTranslatedValue('religion', worker.religion)}</span>
                    </div>
                  )}
                  {worker.marital_status && (
                    <div>
                      <span className="text-sm text-gray-600">{t('workerProfile.maritalStatus')}:</span>
                      <span className="ml-2 font-medium">{getTranslatedValue('maritalStatus', worker.marital_status)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('workerProfile.professionalInfo')}</h3>
                
                {worker.languages_spoken && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-600 block mb-2">{t('workerProfile.languages')}:</span>
                    <div className="flex flex-wrap gap-2">
                      {worker.languages_spoken.split(',').map((lang, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {lang.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {worker.skills && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-600 block mb-2">{t('workerProfile.skills')}:</span>
                    <p className="text-gray-800">{worker.skills}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {worker.status === 'Available' && (
                  <Link
                    to={`/book/${worker.id}`}
                    className="btn-primary text-center py-3 px-6 text-lg"
                  >
                    {t('workerProfile.bookWorker')}
                  </Link>
                )}
                <Link
                  to="/contact"
                  className="btn-outline text-center py-3 px-6 text-lg"
                >
                  {t('contact.title')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;