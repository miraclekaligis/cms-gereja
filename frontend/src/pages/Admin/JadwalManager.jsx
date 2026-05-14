import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CrudForm from '../../components/FormFields/CrudForm';
import api from '../../utils/api';

const emptyForm = {
  kegiatan: '',
  tanggal: '',
  jam: '',
  lokasi: '',
  deskripsi: '',
};

const JadwalManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadData = () => api.get('/jadwal').then((response) => setItems(response.data));
  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/jadwal/${editingId}`, form);
    } else {
      await api.post('/jadwal', form);
    }
    setForm(emptyForm);
    setEditingId(null);
    await loadData();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      kegiatan: item.kegiatan,
      tanggal: item.tanggal,
      jam: item.jam,
      lokasi: item.lokasi,
      deskripsi: item.deskripsi,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus data jadwal ini?')) return;
    await api.delete(`/jadwal/${id}`);
    await loadData();
  };

  const fields = useMemo(() => [
    { key: 'kegiatan', label: 'Kegiatan' },
    { key: 'tanggal', label: 'Tanggal', type: 'date' },
    { key: 'jam', label: 'Jam', type: 'time' },
    { key: 'lokasi', label: 'Lokasi' },
    { key: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
  ], []);

  return (
    <main className="container">
      <h1>Kelola Jadwal</h1>
      <p><Link to="/admin/dashboard">← Kembali ke Dashboard</Link></p>
      <CrudForm
        fields={fields}
        value={form}
        onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Update Jadwal' : 'Tambah Jadwal'}
      />
      <div className="table-wrap card">
        <table>
          <thead><tr><th>Kegiatan</th><th>Tanggal</th><th>Lokasi</th><th>Aksi</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.kegiatan}</td>
                <td>{item.tanggal} {item.jam}</td>
                <td>{item.lokasi}</td>
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

export default JadwalManager;
