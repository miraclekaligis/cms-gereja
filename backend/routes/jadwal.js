const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createJadwal,
  deleteJadwal,
  getAllJadwal,
  updateJadwal,
} = require('../controllers/jadwalController');

const router = express.Router();

router.get('/', getAllJadwal);
router.post('/', authMiddleware, createJadwal);
router.put('/:id', authMiddleware, updateJadwal);
router.delete('/:id', authMiddleware, deleteJadwal);

module.exports = router;
