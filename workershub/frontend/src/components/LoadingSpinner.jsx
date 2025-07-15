import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = ({ size = 'medium', text = null }) => {
  const { t } = useTranslation();
  
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`spinner ${sizeClasses[size]}`}></div>
      {text && (
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      )}
      {!text && (
        <p className="mt-2 text-sm text-gray-500">{t('common.loading')}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;