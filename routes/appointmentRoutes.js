const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const auth = require('../utils/auth');

router.post('/book', auth.authenticateToken, AppointmentController.bookAppointment);
router.put('/:appointmentId/cancel', auth.authenticateToken, AppointmentController.cancelAppointment);

module.exports = router;
