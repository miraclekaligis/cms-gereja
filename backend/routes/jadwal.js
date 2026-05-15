const express = require('express');
const controller = require('../controllers/jadwalController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', controller.list);
router.post('/', authenticateToken, controller.create);
router.put('/:id', authenticateToken, controller.update);
router.delete('/:id', authenticateToken, controller.remove);

module.exports = router;
