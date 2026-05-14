import { useApi } from '../../hooks/useApi';

const Jadwal = () => {
  const { data, loading, error } = useApi('/jadwal');

  return (
    <main className="container card">
      <h1>Jadwal Ibadah</h1>
      {loading && <p>Memuat data...</p>}
      {error && <p>{error}</p>}
      {data.map((item) => (
        <article key={item.id} className="list-item">
          <h3>{item.kegiatan}</h3>
          <p>{item.tanggal} • {item.jam}</p>
          <p>{item.lokasi}</p>
          <p>{item.deskripsi}</p>
        </article>
      ))}
    </main>
  );
};

export default Jadwal;
