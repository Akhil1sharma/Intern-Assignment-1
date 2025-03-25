const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.bookAppointment = async (req, res) => {
  try {
    const { professorId, time } = req.body;
    const professor = await User.findById(professorId);
    if (!professor || professor.role !== 'professor') {
      return res.status(404).send({ message: 'Professor not found' });
    }
    const existingAppointment = await Appointment.findOne({ professor: professorId, time });
    if (existingAppointment) {
      return res.status(400).send({ message: 'Time slot is already booked' });
    }
    const appointment = new Appointment({ student: req.user._id, professor: professorId, time });
    await appointment.save();
    res.send({ message: 'Appointment booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment || appointment.professor.toString() !== req.user._id.toString()) {
      return res.status(404).send({ message: 'Appointment not found or not owned by this professor' });
    }
    appointment.status = 'cancelled';
    await appointment.save();
    res.send({ message: 'Appointment cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
