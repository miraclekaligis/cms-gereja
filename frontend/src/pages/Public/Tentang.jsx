import { useEffect, useState } from 'react';
import api from '../../utils/api';

const defaultContent = "Gereja kami hadir untuk melayani jemaat dan masyarakat.";

const Tentang = () => {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    api.get('/halaman/about_text').then((response) => {
      setContent(response.data.value || defaultContent);
    }).catch(() => {
      setContent(defaultContent);
    });
  }, []);

  return (
    <section className="card">
      <h1>Tentang Gereja</h1>
      <p>{content}</p>
    </section>
  );
};

export default Tentang;
