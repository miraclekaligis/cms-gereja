import { useCallback, useState } from 'react';
import api from '../utils/api';

const useApi = (method, endpoint) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const execute = useCallback(async (payload, params) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.request({
        method,
        url: endpoint,
        data: payload,
        params,
      });
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Terjadi kesalahan pada server';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint, method]);

  return { execute, loading, error };
};

export default useApi;
