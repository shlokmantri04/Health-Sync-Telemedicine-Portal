// controllers/appointmentController.js
// Contains all the business logic for appointment-related API endpoints

const Appointment = require('../models/Appointment');

/**
 * @desc    Create a new appointment
 * @route   POST /api/appointments
 * @access  Public
 */
const createAppointment = async (req, res) =>
{
    try
    {
        const { patientName, age, symptoms, status, heartRate } = req.body;

        // Build and save the new appointment document
        const appointment = new Appointment({
            patientName,
            age,
            symptoms,
            status,
            heartRate,
        });

        const savedAppointment = await appointment.save();

        res.status(201).json({
            success: true,
            message: 'Appointment created successfully',
            data: savedAppointment,
        });
    } catch (error)
    {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError')
        {
            const messages = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get all appointments
 * @route   GET /api/appointments
 * @access  Public
 */
const getAllAppointments = async (req, res) =>
{
    try
    {
        // Retrieve all appointments, most recent first
        const appointments = await Appointment.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments,
        });
    } catch (error)
    {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Get health summary using MongoDB aggregation
 * @route   GET /api/appointments/health-summary
 * @access  Public
 * @returns Average heart rate of Completed appointments +
 *          Total count of Pending appointments
 */
const getHealthSummary = async (req, res) =>
{
    try
    {
        // ── Aggregation pipeline ─────────────────────────────────────────────────
        const result = await Appointment.aggregate([
            {
                // Group the entire collection into one document for global stats
                $facet: {
                    // Calculate average heart rate among Completed appointments
                    avgHeartRate: [
                        { $match: { status: 'Completed' } },
                        {
                            $group: {
                                _id: null,
                                average: { $avg: '$heartRate' },
                            },
                        },
                    ],

                    // Count the number of Pending appointments
                    pendingCount: [
                        { $match: { status: 'Pending' } },
                        {
                            $count: 'total',
                        },
                    ],
                },
            },
        ]);

        // ── Extract values from aggregation result ───────────────────────────────
        const avgHeartRateData = result[0].avgHeartRate[0];
        const pendingCountData = result[0].pendingCount[0];

        const averageHeartRate = avgHeartRateData
            ? Math.round(avgHeartRateData.average)
            : 0;

        const totalPending = pendingCountData ? pendingCountData.total : 0;

        res.status(200).json({
            averageHeartRate,
            totalPending,
        });
    } catch (error)
    {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getHealthSummary,
};
