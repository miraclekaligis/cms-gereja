import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

const toMap = (rows) =>
  rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});

const Beranda = () => {
  const { data: halaman } = useApi('/halaman');
  const { data: jadwal } = useApi('/jadwal');
  const { data: pengumuman } = useApi('/pengumuman');

  const content = toMap(halaman);
  const latestJadwal = jadwal.slice(0, 3);
  const latestPengumuman = pengumuman.filter((item) => item.status !== 'draft').slice(0, 3);

  return (
    <main className="container">
      <section className="card hero">
        <h1>{content.hero_title || 'Selamat Datang di Gereja Kami'}</h1>
        <p>{content.hero_subtitle || 'Kasih, Iman, dan Pelayanan'}</p>
      </section>

      <section className="card">
        <h3>Jadwal Ibadah Terbaru</h3>
        {latestJadwal.map((item) => (
          <p key={item.id}>{item.tanggal} {item.jam} - {item.kegiatan}</p>
        ))}
        <Link to="/jadwal">Lihat semua jadwal</Link>
      </section>

      <section className="card">
        <h3>Pengumuman Terbaru</h3>
        {latestPengumuman.map((item) => (
          <p key={item.id}><strong>{item.judul}</strong> - {item.tanggal}</p>
        ))}
        <Link to="/pengumuman">Lihat semua pengumuman</Link>
      </section>
    </main>
  );
};

export default Beranda;
