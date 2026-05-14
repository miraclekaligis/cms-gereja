const { createCrudController } = require('./crudFactory');

const headers = ['id', 'judul', 'isi', 'tanggal', 'status'];

module.exports = createCrudController('pengumuman', headers);
