const { createCrudController } = require('./crudFactory');

const headers = ['id', 'nama', 'alamat', 'no_hp', 'status', 'tanggal_bergabung'];

module.exports = createCrudController('jemaat', headers);
