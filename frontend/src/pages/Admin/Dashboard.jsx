import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { logout } = useAuth();
  const { data: jemaat } = useApi('/jemaat');
  const { data: jadwal } = useApi('/jadwal');
  const { data: pengumuman } = useApi('/pengumuman');

  return (
    <main className="container">
      <section className="card">
        <h1>Dashboard Admin</h1>
        <div className="stats">
          <p>Total Jemaat: {jemaat.length}</p>
          <p>Total Jadwal: {jadwal.length}</p>
          <p>Total Pengumuman: {pengumuman.length}</p>
        </div>
        <button onClick={logout}>Logout</button>
      </section>

      <section className="card admin-links">
        <Link to="/admin/jemaat">Kelola Jemaat</Link>
        <Link to="/admin/jadwal">Kelola Jadwal</Link>
        <Link to="/admin/pengumuman">Kelola Pengumuman</Link>
        <Link to="/admin/halaman">Edit Halaman</Link>
      </section>
    </main>
  );
};

export default Dashboard;
