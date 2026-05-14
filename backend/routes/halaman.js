const express = require('express');
const controller = require('../controllers/halamanController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.list);
router.post('/', authenticateToken, controller.upsert);

module.exports = router;
