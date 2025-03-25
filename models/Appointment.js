const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: Date,
  status: { type: String, default: 'pending' },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
