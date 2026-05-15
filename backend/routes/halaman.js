const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getAllHalaman,
  getHalaman,
  updateHalaman,
} = require('../controllers/halamanController');

const router = express.Router();

router.get('/', getAllHalaman);
router.get('/:key', getHalaman);
router.put('/:key', authMiddleware, updateHalaman);

module.exports = router;
