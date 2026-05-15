const { createRecord, deleteRecord, getData, updateRecord } = require('../services/sheetService');

const REQUIRED_FIELDS = ['nama', 'alamat', 'no_hp', 'status', 'tanggal_bergabung'];

const validate = (body) => REQUIRED_FIELDS.every((field) => body[field]);

const getAllJemaat = async (_req, res, next) => {
  try {
    const data = await getData('jemaat');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const createJemaat = async (req, res, next) => {
  try {
    if (!validate(req.body)) {
      return res.status(400).json({ message: 'Semua field jemaat wajib diisi' });
    }

    const created = await createRecord('jemaat', req.body);
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

const updateJemaat = async (req, res, next) => {
  try {
    if (!validate(req.body)) {
      return res.status(400).json({ message: 'Semua field jemaat wajib diisi' });
    }

    const updated = await updateRecord('jemaat', req.params.id, req.body);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

const deleteJemaat = async (req, res, next) => {
  try {
    await deleteRecord('jemaat', req.params.id);
    return res.json({ message: 'Data jemaat berhasil dihapus' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllJemaat,
  createJemaat,
  updateJemaat,
  deleteJemaat,
};
