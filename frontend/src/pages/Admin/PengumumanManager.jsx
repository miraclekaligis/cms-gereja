import CrudManager from './CrudManager';

const PengumumanManager = () => (
  <CrudManager
    title="Kelola Pengumuman"
    endpoint="/pengumuman"
    fields={['judul', 'isi', 'tanggal', 'status']}
  />
);

export default PengumumanManager;
