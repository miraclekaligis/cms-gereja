import { useEffect, useMemo, useState } from 'react';
import api from '../../utils/api';

const PAGE_SIZE = 5;

const Pengumuman = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get('/pengumuman').then((response) => setPengumuman(response.data)).catch(() => setPengumuman([]));
  }, []);

  const published = useMemo(
    () => pengumuman.filter((item) => item.status === 'published' || !item.status),
    [pengumuman],
  );

  const totalPages = Math.max(1, Math.ceil(published.length / PAGE_SIZE));
  const current = useMemo(
    () => published.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page, published],
  );

  return (
    <section>
      <h1>Pengumuman</h1>
      <div className="grid">
        {current.map((item) => (
          <article key={item.id} className="card">
            <h3>{item.judul}</h3>
            <p>{item.tanggal}</p>
            <p>{item.isi}</p>
          </article>
        ))}
      </div>
      <div className="pagination">
        <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Next</button>
      </div>
    </section>
  );
};

export default Pengumuman;
