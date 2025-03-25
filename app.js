const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const db = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connectDB();
require('dotenv').config();

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/availability', availabilityRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   