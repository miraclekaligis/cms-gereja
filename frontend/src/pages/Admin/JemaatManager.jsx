import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CrudForm from '../../components/FormFields/CrudForm';
import api from '../../utils/api';

const emptyForm = {
  nama: '',
  alamat: '',
  no_hp: '',
  status: '',
  tanggal_bergabung: '',
};

const JemaatManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadData = () => api.get('/jemaat').then((response) => setItems(response.data));
  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingId) {
      await api.put(`/jemaat/${editingId}`, form);
    } else {
      await api.post('/jemaat', form);
    }
    setForm(emptyForm);
    setEditingId(null);
    await loadData();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      alamat: item.alamat,
      no_hp: item.no_hp,
      status: item.status,
      tanggal_bergabung: item.tanggal_bergabung,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus data jemaat ini?')) return;
    await api.delete(`/jemaat/${id}`);
    await loadData();
  };

  const fields = useMemo(() => [
    { key: 'nama', label: 'Nama' },
    { key: 'alamat', label: 'Alamat' },
    { key: 'no_hp', label: 'No HP' },
    { key: 'status', label: 'Status' },
    { key: 'tanggal_bergabung', label: 'Tanggal Bergabung', type: 'date' },
  ], []);

  return (
    <main className="container">
      <h1>Kelola Jemaat</h1>
      <p><Link to="/admin/dashboard">← Kembali ke Dashboard</Link></p>
      <CrudForm
        fields={fields}
        value={form}
        onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
        onSubmit={handleSubmit}
        submitLabel={editingId ? 'Update Jemaat' : 'Tambah Jemaat'}
      />
      <div className="table-wrap card">
        <table>
          <thead><tr><th>Nama</th><th>No HP</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>{item.no_hp}</td>
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

export default JemaatManager;
