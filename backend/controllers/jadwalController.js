const { createCrudController } = require('./crudFactory');

const headers = ['id', 'kegiatan', 'tanggal', 'jam', 'lokasi', 'deskripsi'];

module.exports = createCrudController('jadwal', headers);
