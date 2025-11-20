const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Malade = require('./models/Malade');

const app = express();

// Middleware
// app.use(cors({
//   origin: ['http://localhost:5173',
//     'https://denty-smile.onrender.com'
//   ],
//   credentials: true
// }));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://denty-client.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Dental Clinic API is running!' });
});

// Get all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Malade.find().sort({ appointmentDate: 1, appointmentTimestamp: 1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new patient with appointment - ALLOW SAME PHONE
app.post('/api/patients', async (req, res) => {
  try {
    const { username, userlastname, phone, appointmentDate, appointmentTime, appointmentTimestamp } = req.body;

    // Validation
    if (!username || !userlastname || !phone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ REMOVED: Phone uniqueness check - allow same phone for multiple appointments

    const newPatient = new Malade({
      username,
      userlastname,
      phone,
      appointmentDate,
      appointmentTime,
      appointmentTimestamp: appointmentTimestamp || appointmentTime
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    // ✅ REMOVED: Duplicate phone error handling
    res.status(400).json({ message: error.message });
  }
});

// Get appointments by date
app.get('/api/appointments/:date', async (req, res) => {
  try {
    const appointments = await Malade.find({ appointmentDate: req.params.date })
      .sort({ appointmentTimestamp: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get today's appointments
app.get('/api/appointments/today', async (req, res) => {
  try {
    const today = new Date().toDateString();
    const appointments = await Malade.find({ appointmentDate: today })
      .sort({ appointmentTimestamp: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by phone number
app.get('/api/appointments/phone/:phone', async (req, res) => {
  try {
    const appointments = await Malade.find({ phone: req.params.phone })
      .sort({ appointmentDate: 1, appointmentTimestamp: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});