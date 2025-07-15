import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { workerApi } from '../api';
import WorkerCard from '../components/WorkerCard';
import FilterBar from '../components/FilterBar';
import LoadingSpinner from '../components/LoadingSpinner';

const Workers = () => {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    nationality: '',
    profession: '',
    status: '',
    min_age: '',
    max_age: '',
  });
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    fetchWorkers();
  }, [filters]);

  const fetchWorkers = async (url = null) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      if (url) {
        response = await fetch(url);
        response = await response.json();
      } else {
        response = await workerApi.getWorkers(filters);
        response = response.data;
      }
      
      setWorkers(response.results);
      setPagination({
        count: response.count,
        next: response.next,
        previous: response.previous,
      });
    } catch (error) {
      setError(t('error') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (url) => {
    fetchWorkers(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('allWorkers')}
          </h1>
          <p className="text-gray-600">
            {pagination.count} {t('workers').toLowerCase()} found
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Workers Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>

            {/* Pagination */}
            {(pagination.previous || pagination.next) && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => handlePageChange(pagination.previous)}
                  disabled={!pagination.previous}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('previous')}
                </button>
                <span className="text-gray-600">
                  {Math.ceil((pagination.count - workers.length) / 20) + 1} of {Math.ceil(pagination.count / 20)}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.next)}
                  disabled={!pagination.next}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('next')}
                </button>
              </div>
            )}

            {/* No Results */}
            {workers.length === 0 && !loading && !error && (
              <div className="text-center py-20">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No workers found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Workers;