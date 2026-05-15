import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="navbar">
    <div className="container nav-inner">
      <Link to="/" className="brand">Gereja Kami</Link>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li>
          <li><Link to="/jadwal">Jadwal Ibadah</Link></li>
          <li><Link to="/pengumuman">Pengumuman</Link></li>
          <li><Link to="/tentang">Tentang</Link></li>
          <li><Link to="/admin/login">Admin</Link></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Navbar;
