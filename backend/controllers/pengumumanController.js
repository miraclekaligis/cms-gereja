const { createRecord, deleteRecord, getData, updateRecord } = require('../services/sheetService');

const REQUIRED_FIELDS = ['judul', 'isi', 'tanggal', 'status'];

const validate = (body) => REQUIRED_FIELDS.every((field) => body[field]);

const getAllPengumuman = async (_req, res, next) => {
  try {
    const data = await getData('pengumuman');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const createPengumuman = async (req, res, next) => {
  try {
    if (!validate(req.body)) {
      return res.status(400).json({ message: 'Semua field pengumuman wajib diisi' });
    }

    const created = await createRecord('pengumuman', req.body);
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

const updatePengumuman = async (req, res, next) => {
  try {
    if (!validate(req.body)) {
      return res.status(400).json({ message: 'Semua field pengumuman wajib diisi' });
    }

    const updated = await updateRecord('pengumuman', req.params.id, req.body);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

const deletePengumuman = async (req, res, next) => {
  try {
    await deleteRecord('pengumuman', req.params.id);
    return res.json({ message: 'Data pengumuman berhasil dihapus' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllPengumuman,
  createPengumuman,
  updatePengumuman,
  deletePengumuman,
};
