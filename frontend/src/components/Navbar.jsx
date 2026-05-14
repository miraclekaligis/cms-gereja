import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>CMS Gereja</h2>
      <div>
        <Link to="/">Beranda</Link>
        <Link to="/jadwal">Jadwal</Link>
        <Link to="/pengumuman">Pengumuman</Link>
        <Link to="/tentang">Tentang</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
