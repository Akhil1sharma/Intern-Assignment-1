const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const user = new User({ name, email, role, password });
    await user.save();
    res.send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , { expiresIn: '1d' });
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    console.log('req.user:', req.user); 

    if (!req.user) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    res.send(req.user); 
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};