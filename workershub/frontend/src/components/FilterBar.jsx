import React from 'react';
import { useTranslation } from 'react-i18next';

const FilterBar = ({ filters, onFilterChange }) => {
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      nationality: '',
      profession: '',
      status: '',
      min_age: '',
      max_age: '',
    });
  };

  const nationalities = [
    'Philippines', 'Indonesia', 'Sri Lanka', 'Bangladesh', 'India', 'Ethiopia', 'Kenya', 'Uganda'
  ];

  const professions = [
    'Housemaid', 'Cleaning Staff', 'Nanny', 'Cook', 'Elderly Care', 'Gardener', 'Driver'
  ];

  const statuses = ['available', 'booked', 'on_leave'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('search')}
          </label>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleInputChange}
            placeholder={t('search')}
            className="form-input"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('nationality')}
          </label>
          <select
            name="nationality"
            value={filters.nationality}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">{t('filterByNationality')}</option>
            {nationalities.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>

        {/* Profession */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('profession')}
          </label>
          <select
            name="profession"
            value={filters.profession}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">{t('filterByProfession')}</option>
            {professions.map((profession) => (
              <option key={profession} value={profession}>
                {t(profession.toLowerCase().replace(' ', ''))}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('status')}
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">{t('filterByStatus')}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {t(status.replace('_', ''))}
              </option>
            ))}
          </select>
        </div>

        {/* Min Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('minAge')}
          </label>
          <input
            type="number"
            name="min_age"
            value={filters.min_age}
            onChange={handleInputChange}
            placeholder="18"
            min="18"
            max="65"
            className="form-input"
          />
        </div>

        {/* Max Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('maxAge')}
          </label>
          <input
            type="number"
            name="max_age"
            value={filters.max_age}
            onChange={handleInputChange}
            placeholder="65"
            min="18"
            max="65"
            className="form-input"
          />
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end md:col-span-2">
          <button
            onClick={clearFilters}
            className="btn-secondary w-full"
          >
            {t('clearFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;