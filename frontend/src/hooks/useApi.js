import { useEffect, useState } from 'react';
import api from '../utils/api';

export const useApi = (url, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refetch = async () => {
    try {
      setLoading(true);
      const response = await api.get(url);
      setData(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await api.get(url);
        if (!active) return;
        setData(response.data);
        setError('');
      } catch (err) {
        if (!active) return;
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [url]);

  return { data, setData, loading, error, refetch };
};
