const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET all pengumuman
router.get('/', async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Get all pengumuman', data: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new pengumuman (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.status(201).json({ message: 'Pengumuman created', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update pengumuman (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Pengumuman updated', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE pengumuman (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Pengumuman deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
