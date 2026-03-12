// models/Appointment.js
// Mongoose schema and model for patient appointments

const mongoose = require('mongoose');

/**
 * AppointmentSchema
 * Defines the structure of a patient appointment document in MongoDB.
 */
const AppointmentSchema = new mongoose.Schema(
    {
        // Patient's full name — required field
        patientName: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true,
        },

        // Patient's age — required field
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age cannot be negative'],
        },

        // Description of the patient's symptoms
        symptoms: {
            type: String,
            trim: true,
            default: '',
        },

        // Current status of the appointment
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled'],
            default: 'Pending',
        },

        // Patient's heart rate in beats per minute
        heartRate: {
            type: Number,
            min: [0, 'Heart rate cannot be negative'],
        },
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true,
    }
);

module.exports = mongoose.model('Appointment', AppointmentSchema);
