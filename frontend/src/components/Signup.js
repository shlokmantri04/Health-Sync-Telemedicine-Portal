import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Signup()
{
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try
        {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/api/auth/register`, formData);
            if (response.data.success)
            {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('doctorName', response.data.user.name);
                navigate('/api/appointments/health-summary');
            }
        } catch (err)
        {
            setError(err.response?.data?.message || 'Error occurred during registration');
        } finally
        {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Doctor Signup</h2>
                <p className="auth-subtitle">Create an account to manage the Health-Sync Portal</p>

                { error && <div className="error-banner">⚠️ { error }</div> }

                <form onSubmit={ handleSubmit } className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" className="form-input" required value={ formData.name } onChange={ handleChange } />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-input" required value={ formData.email } onChange={ handleChange } />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-input" required value={ formData.password } onChange={ handleChange } />
                    </div>

                    <button type="submit" className="btn-submit" disabled={ loading }>
                        { loading ? 'Registering...' : 'Sign Up' }
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/">Log in here</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
