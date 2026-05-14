const { google } = require('googleapis');

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

const getSheetsClient = () => {
  if (!spreadsheetId || !clientEmail || !privateKey) {
    const error = new Error('Google Sheets configuration is missing');
    error.status = 500;
    throw error;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  return { sheets, spreadsheetId };
};

module.exports = { getSheetsClient };
