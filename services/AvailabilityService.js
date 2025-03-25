const User = require('../models/User');

exports.getProfessorAvailability = async (professorId) => {
  try {
    const professor = await User.findById(professorId);
    if (!professor || professor.role !== 'professor') {
      throw new Error('Professor not found');
    }
    return professor.availability;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
