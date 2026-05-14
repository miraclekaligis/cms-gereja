import { useState } from 'react';
import api from '../../utils/api';
import { useApi } from '../../hooks/useApi';

const CrudManager = ({ title, endpoint, fields }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState('');
  const { data, loading, refetch } = useApi(endpoint);

  const submit = async (event) => {
    event.preventDefault();
    try {
      await api.post(endpoint, form);
      setForm({});
      setError('');
      refetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      refetch();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menghapus data');
    }
  };

  return (
    <main className="container card">
      <h1>{title}</h1>
      <form onSubmit={submit} className="grid-form">
        {fields.map((field) => (
          <input
            key={field}
            placeholder={field}
            value={form[field] || ''}
            onChange={(event) => setForm({ ...form, [field]: event.target.value })}
            required={field !== 'deskripsi'}
          />
        ))}
        <button type="submit">Tambah</button>
      </form>

      {error && <p>{error}</p>}
      {loading && <p>Memuat data...</p>}

      {data.map((item) => (
        <article key={item.id} className="list-item row-between">
          <div>
            <strong>{item[fields[0]]}</strong>
            {fields.slice(1).map((field) => (
              <p key={field}>{field}: {item[field]}</p>
            ))}
          </div>
          <button onClick={() => remove(item.id)}>Hapus</button>
        </article>
      ))}
    </main>
  );
};

export default CrudManager;
