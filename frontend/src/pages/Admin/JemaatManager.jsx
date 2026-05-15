import CrudManager from './CrudManager';

const JemaatManager = () => (
  <CrudManager
    title="Kelola Jemaat"
    endpoint="/jemaat"
    fields={['nama', 'alamat', 'no_hp', 'status', 'tanggal_bergabung']}
  />
);

export default JemaatManager;
