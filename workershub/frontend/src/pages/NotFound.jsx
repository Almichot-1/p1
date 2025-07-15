import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="mt-4 text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mt-2 text-2xl font-semibold text-gray-700">
            {t('notFound.title', { defaultValue: 'Page Not Found' })}
          </h2>
          <p className="mt-4 text-gray-600">
            {t('notFound.message', { 
              defaultValue: 'Sorry, the page you are looking for could not be found.' 
            })}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary w-full py-3 text-lg inline-block"
          >
            {t('notFound.goHome', { defaultValue: 'Go to Homepage' })}
          </Link>
          
          <Link
            to="/workers"
            className="btn-outline w-full py-3 text-lg inline-block"
          >
            {t('notFound.browseWorkers', { defaultValue: 'Browse Workers' })}
          </Link>
          
          <Link
            to="/contact"
            className="btn-secondary w-full py-3 text-lg inline-block"
          >
            {t('notFound.contactUs', { defaultValue: 'Contact Us' })}
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            {t('notFound.help', { 
              defaultValue: 'If you believe this is an error, please contact our support team.' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;