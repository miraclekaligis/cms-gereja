import { useApi } from '../../hooks/useApi';

const Tentang = () => {
  const { data } = useApi('/halaman');
  const content = data.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});

  return (
    <main className="container card">
      <h1>Tentang Gereja</h1>
      <p>{content.about_text || 'Informasi gereja dapat dikelola melalui dashboard admin.'}</p>
      <p><strong>Alamat:</strong> {content.church_address || '-'}</p>
      <p><strong>Telepon:</strong> {content.church_phone || '-'}</p>
    </main>
  );
};

export default Tentang;
