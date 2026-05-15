const { getSheetsClient } = require('../config/googleSheets');

const SHEET_HEADERS = {
  jemaat: ['id', 'nama', 'alamat', 'no_hp', 'status', 'tanggal_bergabung'],
  jadwal: ['id', 'kegiatan', 'tanggal', 'jam', 'lokasi', 'deskripsi'],
  pengumuman: ['id', 'judul', 'isi', 'tanggal', 'status'],
  halaman: ['key', 'value'],
};

const getRows = async (sheetName) => {
  const { sheets, spreadsheetId } = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
  });

  return response.data.values || [];
};

const writeRows = async (sheetName, rows) => {
  const { sheets, spreadsheetId } = getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'RAW',
    requestBody: {
      values: rows,
    },
  });
};

const mapRowsToObjects = (rows, headers) => {
  if (!rows.length) {
    return [];
  }

  const bodyRows = rows[0] === headers.join('|') ? rows.slice(1) : rows;

  return bodyRows
    .filter((row) => row.some((cell) => cell !== ''))
    .map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = row[index] || '';
      });
      return record;
    });
};

const getData = async (sheetName) => {
  const headers = SHEET_HEADERS[sheetName];
  const rows = await getRows(sheetName);

  if (!rows.length) {
    return [];
  }

  const dataRows = rows[0]?.join('|') === headers.join('|') ? rows.slice(1) : rows;
  return mapRowsToObjects(dataRows, headers);
};

const saveData = async (sheetName, records) => {
  const headers = SHEET_HEADERS[sheetName];
  const values = records.map((record) => headers.map((header) => record[header] || ''));
  await writeRows(sheetName, [headers, ...values]);
};

const createRecord = async (sheetName, payload) => {
  const records = await getData(sheetName);
  const maxId = records.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
  const next = { ...payload, id: String(maxId + 1) };
  const updated = [...records, next];
  await saveData(sheetName, updated);
  return next;
};

const updateRecord = async (sheetName, id, payload) => {
  const records = await getData(sheetName);
  const index = records.findIndex((item) => item.id === id);

  if (index === -1) {
    const error = new Error('Data not found');
    error.status = 404;
    throw error;
  }

  const updatedRecord = { ...records[index], ...payload, id };
  records[index] = updatedRecord;
  await saveData(sheetName, records);
  return updatedRecord;
};

const deleteRecord = async (sheetName, id) => {
  const records = await getData(sheetName);
  const filtered = records.filter((item) => item.id !== id);

  if (filtered.length === records.length) {
    const error = new Error('Data not found');
    error.status = 404;
    throw error;
  }

  await saveData(sheetName, filtered);
};

const getHalamanByKey = async (key) => {
  const pages = await getData('halaman');
  return pages.find((item) => item.key === key) || null;
};

const upsertHalamanByKey = async (key, value) => {
  const pages = await getData('halaman');
  const index = pages.findIndex((item) => item.key === key);

  if (index >= 0) {
    pages[index] = { key, value };
  } else {
    pages.push({ key, value });
  }

  await saveData('halaman', pages);
  return { key, value };
};

module.exports = {
  getData,
  createRecord,
  updateRecord,
  deleteRecord,
  getHalamanByKey,
  upsertHalamanByKey,
};
