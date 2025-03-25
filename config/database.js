const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    const connectionString = "mongodb://localhost:27017/Assignment";
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
