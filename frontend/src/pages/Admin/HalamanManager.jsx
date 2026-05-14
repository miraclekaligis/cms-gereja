import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const HalamanManager = () => {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  const loadData = () => api.get('/halaman').then((response) => setItems(response.data));

  useEffect(() => { loadData(); }, []);

  const handleChange = (index, value) => {
    const next = [...items];
    next[index] = { ...next[index], value };
    setItems(next);
  };

  const handleSave = async (key, value) => {
    await api.put(`/halaman/${key}`, { value });
    setMessage(`Konten ${key} berhasil disimpan`);
  };

  return (
    <main className="container">
      <h1>Edit Halaman Website</h1>
      <p><Link to="/admin/dashboard">← Kembali ke Dashboard</Link></p>
      {message && <p className="success">{message}</p>}
      <div className="grid">
        {items.map((item, index) => (
          <article className="card" key={item.key}>
            <h3>{item.key}</h3>
            <textarea
              rows={5}
              value={item.value}
              onChange={(event) => handleChange(index, event.target.value)}
            />
            <button type="button" onClick={() => handleSave(item.key, item.value)}>Simpan</button>
          </article>
        ))}
      </div>
    </main>
  );
};

export default HalamanManager;
