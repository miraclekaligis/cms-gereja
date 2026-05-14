const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  createJemaat,
  deleteJemaat,
  getAllJemaat,
  updateJemaat,
} = require('../controllers/jemaatController');

const router = express.Router();

router.get('/', getAllJemaat);
router.post('/', authMiddleware, createJemaat);
router.put('/:id', authMiddleware, updateJemaat);
router.delete('/:id', authMiddleware, deleteJemaat);

module.exports = router;
