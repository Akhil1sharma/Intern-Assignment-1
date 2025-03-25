const express = require('express');
const router = express.Router();
const AvailabilityController = require('../controllers/AvailabilityController');
const auth = require('../utils/auth');

router.post('/set', auth.authenticateToken, AvailabilityController.setAvailability);
router.get('/:professorId', auth.authenticateToken, AvailabilityController.getAvailability);

module.exports = router;
