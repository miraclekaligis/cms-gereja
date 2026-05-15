const {
  getRows,
  appendRow,
  updateRowById,
} = require('../config/googleSheets');

const headers = ['key', 'value'];

const list = async (_req, res, next) => {
  try {
    const rows = await getRows('halaman', headers);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const upsert = async (req, res, next) => {
  try {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ message: 'key is required' });

    const rows = await getRows('halaman', headers);
    const found = rows.find((row) => row.key === key);

    if (found) {
      await updateRowById('halaman', headers, key, { key, value: value || '' });
      return res.json({ key, value: value || '' });
    }

    await appendRow('halaman', [key, value || '']);
    return res.status(201).json({ key, value: value || '' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  list,
  upsert,
};
