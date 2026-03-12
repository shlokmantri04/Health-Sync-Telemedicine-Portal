// routes/appointmentRoutes.js
// Defines all API routes for appointment resources

const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getAllAppointments,
    getHealthSummary,
} = require('../controllers/appointmentController');

// ─── Route Definitions ───────────────────────────────────────────────────────

// NOTE: /health-summary must be registered BEFORE /:id-style params
// to prevent Express from interpreting "health-summary" as a dynamic segment.

// GET  /api/appointments/health-summary — aggregation-based health metrics
router.get('/health-summary', getHealthSummary);

// GET  /api/appointments               — fetch all appointments
router.get('/', getAllAppointments);

// POST /api/appointments               — create a new appointment
router.post('/', createAppointment);

module.exports = router;
