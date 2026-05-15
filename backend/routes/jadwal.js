const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET all jadwal
router.get('/', async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Get all jadwal', data: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new jadwal (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.status(201).json({ message: 'Jadwal created', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update jadwal (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Jadwal updated', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE jadwal (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Jadwal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
