const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// GET all halaman
router.get('/', async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Get all halaman', data: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new halaman (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.status(201).json({ message: 'Halaman created', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
