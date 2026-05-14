const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const jemaatRoutes = require('./routes/jemaat');
const jadwalRoutes = require('./routes/jadwal');
const pengumumanRoutes = require('./routes/pengumuman');
const halamanRoutes = require('./routes/halaman');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_, res) => {
  res.json({ message: 'Church CMS API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jemaat', jemaatRoutes);
app.use('/api/jadwal', jadwalRoutes);
app.use('/api/pengumuman', pengumumanRoutes);
app.use('/api/halaman', halamanRoutes);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
