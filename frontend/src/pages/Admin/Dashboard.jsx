import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [stats, setStats] = useState({ jemaat: 0, jadwal: 0, pengumuman: 0, halaman: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/jemaat'),
      api.get('/jadwal'),
      api.get('/pengumuman'),
      api.get('/halaman'),
    ]).then(([jemaat, jadwal, pengumuman, halaman]) => {
      setStats({
        jemaat: jemaat.data.length,
        jadwal: jadwal.data.length,
        pengumuman: pengumuman.data.length,
        halaman: halaman.data.length,
      });
    }).catch(() => {
      setStats({ jemaat: 0, jadwal: 0, pengumuman: 0, halaman: 0 });
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <main className="container">
      <div className="admin-header">
        <h1>Dashboard Admin</h1>
        <div>
          <p>{user?.email}</p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="grid stats">
        <article className="card"><h3>Jemaat</h3><p>{stats.jemaat}</p></article>
        <article className="card"><h3>Jadwal</h3><p>{stats.jadwal}</p></article>
        <article className="card"><h3>Pengumuman</h3><p>{stats.pengumuman}</p></article>
        <article className="card"><h3>Halaman</h3><p>{stats.halaman}</p></article>
      </div>
      <div className="grid">
        <Link className="card link-card" to="/admin/jemaat">Kelola Jemaat</Link>
        <Link className="card link-card" to="/admin/jadwal">Kelola Jadwal</Link>
        <Link className="card link-card" to="/admin/pengumuman">Kelola Pengumuman</Link>
        <Link className="card link-card" to="/admin/halaman">Edit Halaman</Link>
      </div>
    </main>
  );
};

export default Dashboard;
