import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CrudForm from '../../components/FormFields/CrudForm';
import api from '../../utils/api';

const emptyForm = {
  judul: '',
  isi: '',
  tanggal: '',
  status: 'published',
};

const PengumumanManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadData = () => api.get('/pengumuman').then((response) => setItems(response.data));
  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/pengumuman/${editingId}`, form);
    } else {
      await api.post('/pengumuman', form);
    }
    setForm(emptyForm);
    setEditingId(null);
    await loadData();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      judul: item.judul,
      isi: item.isi,
      tanggal: item.tanggal,
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus pengumuman ini?')) return;
    await api.delete(`/pengumuman/${id}`);
    await loadData();
  };

  const fields = useMemo(() => [
    { key: 'judul', label: 'Judul' },
    { key: 'isi', label: 'Isi', type: 'textarea' },
    { key: 'tanggal', label: 'Tanggal', type: 'date' },
    { key: 'status', label: 'Status' },
  ], []);

  return (
    <main className="container">
      <h1>Kelola Pengumuman</h1>
      <p><Link to="/admin/dashboard">← Kembali ke Dashboard</Link></p>
      <CrudForm
        fields={fields}
        value={form}
        onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Update Pengumuman' : 'Tambah Pengumuman'}
      />
      <div className="table-wrap card">
        <table>
          <thead><tr><th>Judul</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.judul}</td>
                <td>{item.tanggal}</td>
                <td>{item.status}</td>
                <td>
                  <button type="button" onClick={() => startEdit(item)}>Edit</button>
                  <button type="button" onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PengumumanManager;
