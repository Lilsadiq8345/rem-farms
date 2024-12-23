import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';  // Import useNavigate hook
import { registerUser } from '../../../utils/api';
import Navbar from '../../staff/ui/Navbar';
import Footer from '../../staff/ui/Footer';
import './Register.css';

const StaffRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: 'smooth', // Smooth scrolling
    });
  }, []);

  const navigate = useNavigate();  // Initialize navigate function

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await registerUser({
        username,
        email,
        password,
        userType: 'staff',
      });

      if (response.success) {
        setSuccess('Registration successful!');
        setTimeout(() => {
          // Redirect to the login page after 2 seconds
          navigate('/staff-login');
        }, 2000);  // Adjust time for user to see success message
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during registration: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div
        id="staff-register"
        className="flex items-center justify-center min-h-screen mt-20"
        style={{
          backgroundImage: `url('./REM-FARM-LOGO.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Navbar />
        <div className="overlay" />
        <div className="form-container">
          <h2 className="title">Register</h2>
          <form onSubmit={handleRegister}>
            <label className="label">Username</label>
            <input
              type="text"
              className="input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            {/* Display error and success messages */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>

          <p className="footer-text">
            Already have an account? <Link to="/staff-login" className="link">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StaffRegister;
