const { google } = require('googleapis');

const REQUIRED_ENV = [
  'GOOGLE_SHEET_ID',
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
];

const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

const sheetsUnavailableMessage =
  'Google Sheets configuration is incomplete. Please set GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY.';

const auth = missing.length
  ? null
  : new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

const sheets = auth ? google.sheets({ version: 'v4', auth }) : null;

const sheetId = process.env.GOOGLE_SHEET_ID;

const ensureSheetsConfig = () => {
  if (!sheets || !sheetId) {
    const error = new Error(sheetsUnavailableMessage);
    error.status = 500;
    throw error;
  }
};

const ensureHeader = async (sheetName, headers) => {
  ensureSheetsConfig();
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetName}!1:1`,
  });

  if (!data.values || data.values.length === 0 || data.values[0].length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${sheetName}!1:1`,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }
};

const getRows = async (sheetName, headers) => {
  ensureSheetsConfig();
  await ensureHeader(sheetName, headers);

  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetName}!A2:Z`,
  });

  const rows = data.values || [];
  return rows.map((row) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row[index] || '';
    });
    return item;
  });
};

const appendRow = async (sheetName, row) => {
  ensureSheetsConfig();
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
};

const updateRowById = async (sheetName, headers, id, data) => {
  ensureSheetsConfig();
  const { data: result } = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetName}!A2:Z`,
  });

  const rows = result.values || [];
  const index = rows.findIndex((row) => String(row[0]) === String(id));
  if (index === -1) return false;

  const oldRow = rows[index];
  const updated = headers.map((header, columnIndex) => {
    if (data[header] !== undefined) return data[header];
    return oldRow[columnIndex] || '';
  });

  const rowNumber = index + 2;
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${sheetName}!A${rowNumber}:Z${rowNumber}`,
    valueInputOption: 'RAW',
    requestBody: { values: [updated] },
  });

  return true;
};

const deleteRowById = async (sheetName, id) => {
  ensureSheetsConfig();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const targetSheet = meta.data.sheets.find((s) => s.properties.title === sheetName);
  if (!targetSheet) return false;

  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${sheetName}!A2:A`,
  });

  const ids = data.values || [];
  const index = ids.findIndex((row) => String(row[0]) === String(id));
  if (index === -1) return false;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: targetSheet.properties.sheetId,
              dimension: 'ROWS',
              startIndex: index + 1,
              endIndex: index + 2,
            },
          },
        },
      ],
    },
  });

  return true;
};

module.exports = {
  getRows,
  appendRow,
  updateRowById,
  deleteRowById,
  sheetsUnavailableMessage,
};
