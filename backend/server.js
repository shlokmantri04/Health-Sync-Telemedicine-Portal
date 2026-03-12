// server.js - Entry point for the Health-Sync Telemedicine Portal Backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// ─── Middleware ─────────────────────────────────────────────────────────────
// Enable CORS so the React frontend can communicate with this API
app.use(cors());
// Parse incoming JSON request bodies
app.use(express.json());

// ─── Routes ─────────────────────────────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Auth endpoints for Login & Signup
app.use('/api/auth', authRoutes);

// Protected patient endpoints
app.use('/api/appointments', authMiddleware, appointmentRoutes);

// ─── Root health-check endpoint ────────────────────────────────────────────
app.get('/', (req, res) =>
{
  res.json({ message: 'Health-Sync Telemedicine API is running.' });
});

// ─── MongoDB Connection ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthsync';

mongoose
  .connect(MONGO_URI)
  .then(() =>
  {
    console.log('✅  MongoDB connected successfully');
    app.listen(PORT, () =>
    {
      console.log(`🚀  Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) =>
  {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  });
