const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createPengumuman,
  deletePengumuman,
  getAllPengumuman,
  updatePengumuman,
} = require('../controllers/pengumumanController');

const router = express.Router();

router.get('/', getAllPengumuman);
router.post('/', authMiddleware, createPengumuman);
router.put('/:id', authMiddleware, updatePengumuman);
router.delete('/:id', authMiddleware, deletePengumuman);

module.exports = router;
