// src/App.js
// Root layout wrapper for the Telemedicine Application

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

/**
 * ProtectedRoute Wrapper
 * Redirects to Login if no valid doctor token is found
 */
function ProtectedRoute({ children })
{
    const token = localStorage.getItem('token');
    if (!token)
    {
        return <Navigate to="/" replace />;
    }
    return children;
}

function App()
{
    const handleLogout = () =>
    {
        localStorage.removeItem('token');
        localStorage.removeItem('doctorName');
        window.location.href = '/';
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login /> } />
                <Route path="/signup" element={ <Signup /> } />
                <Route
                    path="/api/appointments/health-summary"
                    element={
                        <ProtectedRoute>
                            <div className="app">
                                {/* ── Global Header ───────────────────────────────────── */ }
                                <header className="app-header">
                                    <div className="header-brand">
                                        <div className="header-logo" aria-hidden="true">🩺</div>
                                        <div>
                                            <h1 className="header-title">Health-Sync</h1>
                                            <p className="header-subtitle">Telemedicine Portal</p>
                                        </div>
                                    </div>

                                    {/* User Badge/Profile Indicator Drop-in */ }
                                    <div className="header-badge" style={ { display: 'flex', alignItems: 'center', gap: '12px' } }>
                                        <span>Dr. { localStorage.getItem('doctorName') || 'Admin' }</span>
                                        <button
                                            onClick={ handleLogout }
                                            style={ {
                                                background: '#ff3b30',
                                                cursor: 'pointer',
                                                border: 'none',
                                                color: '#fff',
                                                borderRadius: '20px',
                                                padding: '6px 16px',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                boxShadow: '0 2px 6px rgba(255, 59, 48, 0.3)',
                                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                                transition: 'transform 0.15s ease'
                                            } }
                                            onMouseOver={ (e) => e.currentTarget.style.transform = 'scale(1.05)' }
                                            onMouseOut={ (e) => e.currentTarget.style.transform = 'scale(1)' }
                                            onMouseDown={ (e) => e.currentTarget.style.transform = 'scale(0.95)' }
                                            onMouseUp={ (e) => e.currentTarget.style.transform = 'scale(1.05)' }
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </header>

                                {/* ── Main Content Area (Dashboard view) ───────────── */ }
                                <main className="app-main">
                                    <Dashboard />
                                </main>

                                {/* ── Global Footer ───────────────────────────────────── */ }
                                <footer className="app-footer">
                                    <p>&copy; { new Date().getFullYear() } Health-Sync Telemedicine Portal. All rights reserved.</p>
                                </footer>
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={ <Navigate to="/" replace /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
