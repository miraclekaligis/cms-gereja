import CrudManager from './CrudManager';

const JadwalManager = () => (
  <CrudManager
    title="Kelola Jadwal"
    endpoint="/jadwal"
    fields={['kegiatan', 'tanggal', 'jam', 'lokasi', 'deskripsi']}
  />
);

export default JadwalManager;
