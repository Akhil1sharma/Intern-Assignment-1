const User = require('../models/User');

exports.setAvailability = async (req, res) => {
  try {
    if (req.user.role !== 'professor') {
      return res.status(403).send({ message: 'Only professors can set availability' });
    }
    const { times } = req.body;
    req.user.availability = times;
    await req.user.save();
    res.send({ message: 'Availability updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const professorId = req.params.professorId;
    const professor = await User.findById(professorId);
    if (!professor || professor.role !== 'professor') {
      return res.status(404).send({ message: 'Professor not found' });
    }
    res.send(professor.availability);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
