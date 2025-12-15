const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize SQLite database
require('./utils/sqlite');

const app = express();

// Middleware - CORS configurado para producción
app.use(cors({
  origin: '*', // Permitir cualquier origen (puedes restringirlo después)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const barberRoutes = require('./routes/barbers');
const appointmentRoutes = require('./routes/appointments');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running with SQLite' });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
