import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WorkerCard = ({ worker }) => {
  const { t } = useTranslation();

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

  const getNationalityText = (nationality) => {
    const nationalityMap = {
      'Filipino': t('nationalities.filipino'),
      'Indonesian': t('nationalities.indonesian'),
      'Indian': t('nationalities.indian'),
      'Sri Lankan': t('nationalities.sriLankan'),
      'Ethiopian': t('nationalities.ethiopian'),
      'Kenyan': t('nationalities.kenyan'),
      'Bangladeshi': t('nationalities.bangladeshi'),
      'Nepalese': t('nationalities.nepalese'),
      'Other': t('nationalities.other'),
    };
    return nationalityMap[nationality] || nationality;
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      {/* Worker Image */}
      <div className="relative">
        <img
          src={worker.image_url || '/api/placeholder/300/200'}
          alt={worker.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/api/placeholder/300/200';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className={`${getStatusClass(worker.status)} text-xs`}>
            {getStatusText(worker.status)}
          </span>
        </div>
      </div>

      {/* Worker Information */}
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{worker.name}</h3>
          <span className="text-sm text-gray-500">{worker.age} years</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('workerProfile.profession')}:</span>
            <span className="text-sm font-medium text-gray-900">{getProfessionText(worker.profession)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('workerProfile.nationality')}:</span>
            <span className="text-sm font-medium text-gray-900">{getNationalityText(worker.nationality)}</span>
          </div>
          
          {worker.experience_years > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t('workerProfile.experience')}:</span>
              <span className="text-sm font-medium text-gray-900">
                {t('workerCard.yearsExp', { count: worker.experience_years })}
              </span>
            </div>
          )}
          
          {worker.salary_expectation && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t('workerCard.salaryExpectation')}:</span>
              <span className="text-sm font-medium text-primary-600">
                {worker.salary_expectation.toLocaleString()} {t('workerCard.currency')}
              </span>
            </div>
          )}
        </div>

        {/* Languages */}
        {worker.languages_spoken && (
          <div className="mb-4">
            <span className="text-sm text-gray-600 block mb-1">{t('workerCard.languages')}:</span>
            <div className="flex flex-wrap gap-1">
              {worker.languages_spoken.split(',').map((lang, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {lang.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/workers/${worker.id}`}
            className="flex-1 btn-outline text-center py-2 text-sm"
          >
            {t('workers.viewProfile')}
          </Link>
          
          {worker.status === 'Available' && (
            <Link
              to={`/book/${worker.id}`}
              className="flex-1 btn-primary text-center py-2 text-sm"
            >
              {t('workers.book')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;