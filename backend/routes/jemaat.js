const express = require('express');

const router = express.Router();

// GET all jemaat
router.get('/', async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Get all jemaat', data: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new jemaat
router.post('/', async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.status(201).json({ message: 'Jemaat created', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update jemaat
router.put('/:id', async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Jemaat updated', data: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE jemaat
router.delete('/:id', async (req, res) => {
  try {
    // TODO: Integrate with Google Sheets
    res.json({ message: 'Jemaat deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
