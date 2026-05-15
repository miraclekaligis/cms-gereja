import { useApi } from '../../hooks/useApi';

const Pengumuman = () => {
  const { data, loading, error } = useApi('/pengumuman');
  const published = (Array.isArray(data) ? data : []).filter((item) => item.status !== 'draft');

  return (
    <main className="container card">
      <h1>Pengumuman Gereja</h1>
      {loading && <p>Memuat data...</p>}
      {error && <p>{error}</p>}
      {published.map((item) => (
        <article key={item.id} className="list-item">
          <h3>{item.judul}</h3>
          <small>{item.tanggal}</small>
          <p>{item.isi}</p>
        </article>
      ))}
    </main>
  );
};

export default Pengumuman;
