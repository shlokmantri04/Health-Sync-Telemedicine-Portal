// src/components/Dashboard.js
// Main dashboard composite — manages state for search, fetching data, and composing UI

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import MetricCards from './MetricCards';
import SearchBar from './SearchBar';
import AppointmentList from './AppointmentList';
import AddAppointmentForm from './AddAppointmentForm';
import './Dashboard.css';

/**
 * Dashboard Container Component
 * Holds application state for appointments and metrics.
 */
function Dashboard()
{
    const [appointments, setAppointments] = useState([]);
    const [metrics, setMetrics] = useState({ averageHeartRate: null, pendingAppointments: null });
    const [searchQuery, setSearchQuery] = useState('');

    const [loadingAppts, setLoadingAppts] = useState(true);
    const [loadingMetrics, setLoadingMetrics] = useState(true);
    const [error, setError] = useState('');

    const [showAddForm, setShowAddForm] = useState(false);

    // ── Data Fetching ───────────────────────────────────────────────────────

    // Fetch both the full list of appointments AND the aggregated health summary
    const fetchDashboardData = useCallback(async () =>
    {
        try
        {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const BASE_URL = `${API_URL}/api/appointments`;
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [apptsRes, summaryRes] = await Promise.all([
                axios.get(BASE_URL, config),
                axios.get(`${BASE_URL}/health-summary`, config)
            ]);

            if (apptsRes.data.success)
            {
                setAppointments(apptsRes.data.data);
            }

            setMetrics({
                averageHeartRate: summaryRes.data.averageHeartRate,
                pendingAppointments: summaryRes.data.totalPending || summaryRes.data.pendingAppointments
            });

            setError('');
        } catch (err)
        {
            console.error('API Error:', err);
            setError('Unable to load dashboard data. Please verify the backend server is running.');
        } finally
        {
            setLoadingAppts(false);
            setLoadingMetrics(false);
        }
    }, []);

    // Fetch data on initial mount
    useEffect(() =>
    {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // ── Derived State (Search Filtering) ────────────────────────────────────

    // Filter appointments client-side based on the search query (patient name)
    const filteredAppointments = appointments.filter((appt) =>
        appt.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ── User Actions ────────────────────────────────────────────────────────

    // Callback when a new appointment is created
    const handleAddSuccess = () =>
    {
        // Re-fetch data to reflect new appointment and updated metrics (from MongoDB)
        fetchDashboardData();
    };

    return (
        <div className="dashboard">

            {/* Hero Metrics Section */ }
            <section aria-label="Key Performance Indicators">
                <h3 className="dashboard-section-title">Overview</h3>
                <MetricCards
                    averageHeartRate={ metrics.averageHeartRate }
                    pendingAppointments={ metrics.pendingAppointments }
                    loading={ loadingMetrics }
                />
            </section>

            {/* Toolbar — Search & Add Appointment Toggle */ }
            <section className="dashboard-toolbar" aria-label="Controls">
                <SearchBar value={ searchQuery } onChange={ setSearchQuery } />

                <button
                    className="btn-add-appointment"
                    onClick={ () => setShowAddForm(!showAddForm) }
                    aria-expanded={ showAddForm }
                >
                    { showAddForm ? '❌ Close Form' : '➕ Add Appointment' }
                </button>
            </section>

            {/* Slide-down Form Panel */ }
            { showAddForm && (
                <section aria-label="New Appointment Form">
                    <AddAppointmentForm
                        onAddSuccess={ handleAddSuccess }
                        onClose={ () => setShowAddForm(false) }
                    />
                </section>
            ) }

            {/* Main Data Table */ }
            <section aria-label="Appointments Roster">
                { error && (
                    <div className="error-banner">
                        <span aria-hidden="true">⚠️</span> { error }
                    </div>
                ) }

                <AppointmentList
                    appointments={ filteredAppointments }
                    loading={ loadingAppts }
                />
            </section>

        </div>
    );
}

export default Dashboard;
