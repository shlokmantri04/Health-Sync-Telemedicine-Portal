// src/components/MetricCards.js
// Displays KPI cards: Average Heart Rate and Total Pending Appointments

import './MetricCards.css';

/**
 * MetricCards
 * @param {number|null} averageHeartRate   - Average BPM from Completed appointments
 * @param {number|null} pendingAppointments - Count of Pending appointments
 * @param {boolean}     loading             - Whether the summary data is still loading
 */
function MetricCards({ averageHeartRate, pendingAppointments, loading })
{
    return (
        <div className="metric-cards" role="region" aria-label="Health Summary Metrics">

            {/* ── Card 1: Average Heart Rate ─────────────────────── */ }
            <div className={ `metric-card metric-card--heart${loading ? ' metric-card--loading' : ''}` }
                aria-label="Average Heart Rate">
                <div className="metric-card__icon" aria-hidden="true">❤️</div>
                <div className="metric-card__body">
                    <span className="metric-card__label">Avg Heart Rate</span>
                    { loading ? (
                        <div className="metric-card__value" />  /* skeleton placeholder */
                    ) : (
                        <span className="metric-card__value">{ averageHeartRate ?? '—' }</span>
                    ) }
                    <span className="metric-card__unit">BPM · Completed appointments</span>
                </div>
            </div>

            {/* ── Card 2: Pending Appointments ────────────────────── */ }
            <div className={ `metric-card metric-card--pending${loading ? ' metric-card--loading' : ''}` }
                aria-label="Total Pending Appointments">
                <div className="metric-card__icon" aria-hidden="true">🕐</div>
                <div className="metric-card__body">
                    <span className="metric-card__label">Pending Appointments</span>
                    { loading ? (
                        <div className="metric-card__value" />  /* skeleton placeholder */
                    ) : (
                        <span className="metric-card__value">{ pendingAppointments ?? '—' }</span>
                    ) }
                    <span className="metric-card__unit">Awaiting review</span>
                </div>
            </div>

        </div>
    );
}

export default MetricCards;
