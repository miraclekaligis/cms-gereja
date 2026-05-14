const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const jemaatRoutes = require('./routes/jemaat');
const jadwalRoutes = require('./routes/jadwal');
const pengumumanRoutes = require('./routes/pengumuman');
const halamanRoutes = require('./routes/halaman');
const { authenticateToken } = require('./middleware/auth');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jemaat', authenticateToken, jemaatRoutes);
app.use('/api/jadwal', jadwalRoutes);
app.use('/api/pengumuman', pengumumanRoutes);
app.use('/api/halaman', halamanRoutes);

app.use((error, _req, res, _next) => {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on port ${PORT}`);
});
