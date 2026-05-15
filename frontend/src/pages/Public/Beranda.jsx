import { useEffect, useMemo, useState } from 'react';
import api from '../../utils/api';

const Beranda = () => {
  const [halaman, setHalaman] = useState([]);

  useEffect(() => {
    api.get('/halaman').then((response) => setHalaman(response.data)).catch(() => setHalaman([]));
  }, []);

  const content = useMemo(() => {
    const map = Object.fromEntries(halaman.map((item) => [item.key, item.value]));
    return {
      heroTitle: map.hero_title || 'Selamat Datang di Gereja Kami',
      heroSubtitle: map.hero_subtitle || 'Komunitas iman yang bertumbuh bersama.',
      churchAddress: map.church_address || 'Alamat gereja belum diatur',
    };
  }, [halaman]);

  return (
    <section className="hero-section card">
      <h1>{content.heroTitle}</h1>
      <p>{content.heroSubtitle}</p>
      <p><strong>Alamat:</strong> {content.churchAddress}</p>
    </section>
  );
};

export default Beranda;
