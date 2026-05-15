import { useState } from 'react';
import api from '../../utils/api';
import { useApi } from '../../hooks/useApi';

const defaultKeys = [
  'hero_title',
  'hero_subtitle',
  'about_text',
  'footer_text',
  'church_address',
  'church_phone',
];

const HalamanManager = () => {
  const { data, refetch } = useApi('/halaman');
  const [error, setError] = useState('');

  const mapped = (Array.isArray(data) ? data : []).reduce(
    (acc, item) => ({ ...acc, [item.key]: item.value }),
    {}
  );

  const save = async (key, value) => {
    try {
      await api.post('/halaman', { key, value });
      setError('');
      refetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan halaman');
    }
  };

  return (
    <main className="container card">
      <h1>Edit Halaman Website</h1>
      {error && <p>{error}</p>}
      {defaultKeys.map((key) => (
        <div key={key} className="list-item">
          <label>{key}</label>
          <textarea
            defaultValue={mapped[key] || ''}
            onBlur={(event) => save(key, event.target.value)}
          />
        </div>
      ))}
    </main>
  );
};

export default HalamanManager;
