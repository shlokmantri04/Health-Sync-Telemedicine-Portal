// src/components/AppointmentList.js
// Table displaying all scheduled patient appointments

import './AppointmentList.css';

/**
 * Helper to generate monogram initials (e.g., "John Doe" -> "JD")
 */
function getInitials(name)
{
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * AppointmentList Table
 * @param {Array}  appointments - List of appointment objects
 * @param {boolean} loading     - Whether the data is being fetched
 */
function AppointmentList({ appointments, loading })
{
    if (loading)
    {
        return (
            <div className="appointment-list">
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Loading appointments…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="appointment-list" role="region" aria-label="Appointments Table">
            <div className="appointment-list__header">
                <h2 className="appointment-list__title">
                    🗓️ Schedule
                    <span className="appointment-list__count">{ appointments.length }</span>
                </h2>
            </div>

            <div className="appointments-table-wrapper">
                <table className="appointments-table" aria-label="Appointments">
                    <thead>
                        <tr>
                            <th scope="col">Patient Data</th>
                            <th scope="col">Age</th>
                            <th scope="col">Symptoms</th>
                            <th scope="col">Status</th>
                            <th scope="col">Heart Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        { appointments.length === 0 ? (
                            <tr>
                                <td colSpan="5">
                                    <div className="empty-state">
                                        <div className="empty-state__icon" aria-hidden="true">🩺</div>
                                        <div className="empty-state__title">No Patient Data</div>
                                        <div className="empty-state__subtitle">Try adjusting your search criteria, or click "Add Appointment" to create one.</div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            appointments.map((appt) => (
                                <tr key={ appt._id }>
                                    {/* Name cell with generated avatar */ }
                                    <td>
                                        <div className="patient-name">
                                            <div className="patient-avatar" aria-hidden="true">
                                                { getInitials(appt.patientName) }
                                            </div>
                                            { appt.patientName }
                                        </div>
                                    </td>

                                    <td>{ appt.age }</td>

                                    <td>
                                        { appt.symptoms ? (
                                            <span className="truncate">{ appt.symptoms }</span>
                                        ) : (
                                            <span style={ { color: 'var(--color-text-muted)' } }>—</span>
                                        ) }
                                    </td>

                                    {/* Status Badge */ }
                                    <td>
                                        <div className={ `status-badge status-badge--${appt.status.toLowerCase()}` }>
                                            <span className="status-dot"></span>
                                            { appt.status }
                                        </div>
                                    </td>

                                    {/* Heart rate monitor UI element */ }
                                    <td>
                                        { appt.heartRate ? (
                                            <div className="heart-rate-cell">
                                                <span className="heart-icon" aria-hidden="true">💓</span>
                                                { appt.heartRate } bpm
                                            </div>
                                        ) : (
                                            <span style={ { color: 'var(--color-text-muted)' } }>Not recorded</span>
                                        ) }
                                    </td>
                                </tr>
                            ))
                        ) }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentList;
