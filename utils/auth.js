const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    console.error('No token provided');
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); 

    const user = await User.findById(decoded.userId);
    console.log('Fetched User:', user); 

    if (!user) {
      console.error('User not found');
      return res.status(404).send({ message: 'User not found' });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    console.error('Invalid token:', error.message);
    res.status(400).send({ message: 'Invalid token.' });
  }
};
