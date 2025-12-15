const express = require('express');
const AppointmentController = require('../controllers/AppointmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, AppointmentController.create);
router.get('/my-appointments', authMiddleware, AppointmentController.getMyAppointments);
router.get('/barber-appointments', authMiddleware, AppointmentController.getBarberAppointments);
router.get('/available-slots', AppointmentController.getAvailableSlots);
router.get('/:id', AppointmentController.getAppointmentById);
router.delete('/:id', authMiddleware, AppointmentController.cancelAppointment);
router.put('/:id/status', authMiddleware, AppointmentController.updateAppointmentStatus);

module.exports = router;
