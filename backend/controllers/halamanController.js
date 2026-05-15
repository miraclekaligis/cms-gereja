const { getData, getHalamanByKey, upsertHalamanByKey } = require('../services/sheetService');

const getAllHalaman = async (_req, res, next) => {
  try {
    const data = await getData('halaman');
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getHalaman = async (req, res, next) => {
  try {
    const page = await getHalamanByKey(req.params.key);

    if (!page) {
      return res.status(404).json({ message: 'Konten halaman tidak ditemukan' });
    }

    return res.json(page);
  } catch (error) {
    return next(error);
  }
};

const updateHalaman = async (req, res, next) => {
  try {
    if (!req.body.value) {
      return res.status(400).json({ message: 'Value wajib diisi' });
    }

    const updated = await upsertHalamanByKey(req.params.key, req.body.value);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllHalaman,
  getHalaman,
  updateHalaman,
};
