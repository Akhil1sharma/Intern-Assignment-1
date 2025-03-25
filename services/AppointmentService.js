const Appointment = require('../models/Appointment');

exports.getStudentAppointments = async (studentId) => {
  try {
    const appointments = await Appointment.find({ student: studentId, status: 'pending' });
    return appointments;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.cancelAppointment = async (appointmentId) => {
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    appointment.status = 'cancelled';
    await appointment.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
