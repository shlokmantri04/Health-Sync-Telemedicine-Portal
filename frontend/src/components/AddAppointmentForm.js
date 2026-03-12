// src/components/AddAppointmentForm.js
// Form component for scheduling a new patient appointment

import { useState } from 'react';
import axios from 'axios';
import './AddAppointmentForm.css';

/**
 * AddAppointmentForm
 * @param {Function} onAddSuccess - Callback invoked when an appointment is successfully created
 * @param {Function} onClose      - Callback to collapse/hide the form panel
 */
function AddAppointmentForm({ onAddSuccess, onClose })
{
    const [formData, setFormData] = useState({
        patientName: '',
        age: '',
        symptoms: '',
        status: 'Pending',
        heartRate: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    // ── Handle Input Changes ──────────────────────────────────────────────
    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            // For age/hr, ensure we only store numeric strings (or empty)
            [name]: name === 'age' || name === 'heartRate'
                ? value.replace(/[^0-9]/g, '')
                : value
        }));
    };

    // ── Form Submission ───────────────────────────────────────────────────
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg('');

        try
        {
            // Send data to the Express backend
            const token = localStorage.getItem('token');
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/api/appointments`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // On success, reset the form and show banner
            if (response.data.success)
            {
                setFormData({
                    patientName: '',
                    age: '',
                    symptoms: '',
                    status: 'Pending',
                    heartRate: '',
                });
                setSuccessMsg('Appointment scheduled successfully!');

                // Notify parent grid to refresh list
                onAddSuccess(response.data.data);

                // Auto-close form after a brief delay
                setTimeout(() =>
                {
                    onClose();
                }, 1500);
            }
        } catch (err)
        {
            // Display validation errors passed from Mongoose
            if (err.response && err.response.data.message)
            {
                setError(err.response.data.message);
            } else
            {
                setError('Failed to schedule appointment. Please check your connection.');
            }
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <div className="add-form-card" role="dialog" aria-labelledby="form-title">
            <div className="add-form-card__header">
                <h3 id="form-title">➕ Schedule New Patient</h3>
                <button className="btn-close-form" onClick={ onClose } aria-label="Close form">
                    &times;
                </button>
            </div>

            <form className="add-form" onSubmit={ handleSubmit }>

                {/* Banner for errors */ }
                { error && (
                    <div className="error-banner">
                        <span aria-hidden="true">⚠️</span> { error }
                    </div>
                ) }

                <div className="form-grid">

                    {/* Patient Name */ }
                    <div className="form-group form-group--full">
                        <label htmlFor="patientName" className="form-label">
                            Patient Full Name <span>*</span>
                        </label>
                        <input
                            id="patientName"
                            name="patientName"
                            type="text"
                            className="form-input"
                            value={ formData.patientName }
                            onChange={ handleChange }
                            placeholder="e.g. Jane Doe"
                            required
                            autoFocus
                        />
                    </div>

                    {/* Age */ }
                    <div className="form-group">
                        <label htmlFor="age" className="form-label">
                            Age <span>*</span>
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            className="form-input"
                            value={ formData.age }
                            onChange={ handleChange }
                            placeholder="Years"
                            min="0"
                            required
                        />
                    </div>

                    {/* Heart Rate */ }
                    <div className="form-group">
                        <label htmlFor="heartRate" className="form-label">
                            Heart Rate
                        </label>
                        <input
                            id="heartRate"
                            name="heartRate"
                            type="number"
                            className="form-input"
                            value={ formData.heartRate }
                            onChange={ handleChange }
                            placeholder="BPM (optional)"
                            min="0"
                        />
                    </div>

                    {/* Status */ }
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="form-select"
                            value={ formData.status }
                            onChange={ handleChange }
                        >
                            <option value="Pending">🕒 Pending</option>
                            <option value="Completed">✅ Completed</option>
                            <option value="Cancelled">❌ Cancelled</option>
                        </select>
                    </div>

                    {/* Symptoms */ }
                    <div className="form-group form-group--full">
                        <label htmlFor="symptoms" className="form-label">
                            Reported Symptoms
                        </label>
                        <textarea
                            id="symptoms"
                            name="symptoms"
                            className="form-input"
                            value={ formData.symptoms }
                            onChange={ handleChange }
                            placeholder="Brief description of patient's condition…"
                            rows="3"
                        />
                    </div>

                </div>

                <div className="form-footer">
                    <button type="submit" className="btn-submit" disabled={ loading }>
                        { loading ? 'Scheduling...' : 'Confirm Appointment' }
                    </button>
                    <button type="button" className="btn-reset" onClick={ onClose } disabled={ loading }>
                        Cancel
                    </button>

                    { successMsg && (
                        <div className="form-success-msg">
                            <span aria-hidden="true">🎉</span> { successMsg }
                        </div>
                    ) }
                </div>

            </form>
        </div>
    );
}

export default AddAppointmentForm;
