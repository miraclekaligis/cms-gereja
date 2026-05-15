import { useEffect, useMemo, useState } from 'react';
import api from '../../utils/api';

const Jadwal = () => {
  const [jadwal, setJadwal] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    api.get('/jadwal').then((response) => setJadwal(response.data)).catch(() => setJadwal([]));
  }, []);

  const filtered = useMemo(
    () => jadwal.filter((item) => !filterDate || item.tanggal === filterDate),
    [filterDate, jadwal],
  );

  return (
    <section>
      <h1>Jadwal Ibadah</h1>
      <label className="filter">
        Filter tanggal
        <input type="date" value={filterDate} onChange={(event) => setFilterDate(event.target.value)} />
      </label>
      <div className="grid">
        {filtered.map((item) => (
          <article className="card" key={item.id}>
            <h3>{item.kegiatan}</h3>
            <p>{item.tanggal} - {item.jam}</p>
            <p>{item.lokasi}</p>
            <p>{item.deskripsi}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Jadwal;
