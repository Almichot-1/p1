import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../utils/api';
import WorkerCard from '../components/WorkerCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Workers = () => {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    profession: '',
    nationality: '',
    status: '',
    religion: '',
    maritalStatus: '',
    ageMin: '',
    ageMax: '',
    experienceMin: '',
  });
  const [sortBy, setSortBy] = useState('-created_at');
  const [filterChoices, setFilterChoices] = useState({});

  useEffect(() => {
    fetchFilterChoices();
  }, []);

  useEffect(() => {
    fetchWorkers();
  }, [searchTerm, filters, sortBy]);

  const fetchFilterChoices = async () => {
    try {
      const choices = await apiService.getFilterChoices();
      setFilterChoices(choices);
    } catch (error) {
      console.error('Error fetching filter choices:', error);
    }
  };

  const fetchWorkers = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        ordering: sortBy,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        ),
      };
      
      const data = await apiService.getWorkers(params);
      setWorkers(data.results || data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      profession: '',
      nationality: '',
      status: '',
      religion: '',
      maritalStatus: '',
      ageMin: '',
      ageMax: '',
      experienceMin: '',
    });
    setSearchTerm('');
    setSortBy('-created_at');
  };

  const getOptionText = (category, value) => {
    const maps = {
      professions: {
        'Housemaid': t('professions.housemaid'),
        'Cleaner': t('professions.cleaner'),
        'Cook': t('professions.cook'),
        'Nanny': t('professions.nanny'),
        'Caregiver': t('professions.caregiver'),
        'Driver': t('professions.driver'),
        'Gardener': t('professions.gardener'),
        'Other': t('professions.other'),
      },
      nationalities: {
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
      worker_statuses: {
        'Available': t('status.available'),
        'Booked': t('status.booked'),
        'On Leave': t('status.onLeave'),
      },
      religions: {
        'Islam': t('religions.islam'),
        'Christianity': t('religions.christianity'),
        'Hinduism': t('religions.hinduism'),
        'Buddhism': t('religions.buddhism'),
        'Other': t('religions.other'),
      },
      marital_statuses: {
        'Single': t('maritalStatus.single'),
        'Married': t('maritalStatus.married'),
        'Divorced': t('maritalStatus.divorced'),
        'Widowed': t('maritalStatus.widowed'),
      },
    };
    return maps[category]?.[value] || value;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('workers.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('workers.subtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder={t('workers.searchPlaceholder')}
                value={searchTerm}
                onChange={handleSearchChange}
                className="input-field pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {/* Profession Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('workers.filters.profession')}
              </label>
              <select
                value={filters.profession}
                onChange={(e) => handleFilterChange('profession', e.target.value)}
                className="select-field"
              >
                <option value="">{t('common.all', { defaultValue: 'All' })}</option>
                {filterChoices.professions?.map(([value, _]) => (
                  <option key={value} value={value}>
                    {getOptionText('professions', value)}
                  </option>
                ))}
              </select>
            </div>

            {/* Nationality Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('workers.filters.nationality')}
              </label>
              <select
                value={filters.nationality}
                onChange={(e) => handleFilterChange('nationality', e.target.value)}
                className="select-field"
              >
                <option value="">{t('common.all', { defaultValue: 'All' })}</option>
                {filterChoices.nationalities?.map(([value, _]) => (
                  <option key={value} value={value}>
                    {getOptionText('nationalities', value)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('workers.filters.status')}
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="select-field"
              >
                <option value="">{t('common.all', { defaultValue: 'All' })}</option>
                {filterChoices.worker_statuses?.map(([value, _]) => (
                  <option key={value} value={value}>
                    {getOptionText('worker_statuses', value)}
                  </option>
                ))}
              </select>
            </div>

            {/* Religion Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('workers.filters.religion')}
              </label>
              <select
                value={filters.religion}
                onChange={(e) => handleFilterChange('religion', e.target.value)}
                className="select-field"
              >
                <option value="">{t('common.all', { defaultValue: 'All' })}</option>
                {filterChoices.religions?.map(([value, _]) => (
                  <option key={value} value={value}>
                    {getOptionText('religions', value)}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('workers.filters.ageRange')}
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.ageMin}
                  onChange={(e) => handleFilterChange('ageMin', e.target.value)}
                  className="input-field"
                  min="18"
                  max="60"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.ageMax}
                  onChange={(e) => handleFilterChange('ageMax', e.target.value)}
                  className="input-field"
                  min="18"
                  max="60"
                />
              </div>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('workers.filters.experience')}
              </label>
              <input
                type="number"
                placeholder="Min years"
                value={filters.experienceMin}
                onChange={(e) => handleFilterChange('experienceMin', e.target.value)}
                className="input-field"
                min="0"
                max="20"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('workers.sort.label')}
              </label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="select-field"
              >
                <option value="-created_at">{t('workers.sort.newest')}</option>
                <option value="name">{t('workers.sort.name')}</option>
                <option value="age">{t('workers.sort.age')}</option>
                <option value="-experience_years">{t('workers.sort.experience')}</option>
                <option value="salary_expectation">{t('workers.sort.salary')}</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="btn-secondary w-full"
              >
                {t('workers.filters.clear')}
              </button>
            </div>
          </div>
        </div>

        {/* Workers Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" text={t('workers.loading')} />
          </div>
        ) : workers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('workers.noResults')}
            </h3>
            <p className="text-gray-500">
              {t('workers.noResultsDesc', { defaultValue: 'Try adjusting your search criteria or filters.' })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workers;