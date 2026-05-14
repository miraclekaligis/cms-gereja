const { createRecord, deleteRecord, getData, updateRecord } = require('../services/sheetService');

const REQUIRED_FIELDS = ['kegiatan', 'tanggal', 'jam', 'lokasi', 'deskripsi'];

const validate = (body) => REQUIRED_FIELDS.every((field) => body[field]);

const getAllJadwal = async (_req, res, next) => {
  try {
    const data = await getData('jadwal');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const createJadwal = async (req, res, next) => {
  try {
    if (!validate(req.body)) {
      return res.status(400).json({ message: 'Semua field jadwal wajib diisi' });
    }

    const created = await createRecord('jadwal', req.body);
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

const updateJadwal = async (req, res, next) => {
  try {
    if (!validate(req.body)) {
      return res.status(400).json({ message: 'Semua field jadwal wajib diisi' });
    }

    const updated = await updateRecord('jadwal', req.params.id, req.body);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

const deleteJadwal = async (req, res, next) => {
  try {
    await deleteRecord('jadwal', req.params.id);
    return res.json({ message: 'Data jadwal berhasil dihapus' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllJadwal,
  createJadwal,
  updateJadwal,
  deleteJadwal,
};
