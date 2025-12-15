const express = require('express');
const BarberController = require('../controllers/BarberController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/', BarberController.getAll);
router.get('/:id', BarberController.getById);
router.post('/', authMiddleware, adminMiddleware, BarberController.create);
router.put('/:id', authMiddleware, adminMiddleware, BarberController.update);
router.delete('/:id', authMiddleware, adminMiddleware, BarberController.deactivate);

module.exports = router;
