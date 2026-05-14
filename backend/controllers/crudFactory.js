const {
  getRows,
  appendRow,
  updateRowById,
  deleteRowById,
} = require('../config/googleSheets');

const createCrudController = (sheetName, headers) => {
  const list = async (_req, res, next) => {
    try {
      const rows = await getRows(sheetName, headers);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const payload = { ...req.body };
      payload.id = payload.id || Date.now().toString();
      const row = headers.map((header) => payload[header] || '');
      await appendRow(sheetName, row);
      res.status(201).json(payload);
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const ok = await updateRowById(sheetName, headers, req.params.id, req.body || {});
      if (!ok) return res.status(404).json({ message: 'Data not found' });
      return res.json({ message: 'Updated successfully' });
    } catch (error) {
      return next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const ok = await deleteRowById(sheetName, req.params.id);
      if (!ok) return res.status(404).json({ message: 'Data not found' });
      return res.json({ message: 'Deleted successfully' });
    } catch (error) {
      return next(error);
    }
  };

  return { list, create, update, remove };
};

module.exports = { createCrudController };
