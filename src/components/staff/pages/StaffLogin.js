// src/components/staff/pages/StaffLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import StaffNavbar from '../../staff/ui/StaffNavbar';
import StaffFooter from '../../staff/ui/StaffFooter';

const StaffLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // If login is successful, navigate to the dashboard
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Store token in localStorage
        navigate('/staff-dashboard');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="">
      <StaffNavbar />
      <div
        id="staff-login"
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url('./REM-FARM-LOGO.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="overlay" />
        <div className="form-container">
          <h2 className="title">StaffLogin</h2>
          {error && <p className="error-text">{error}</p>} {/* Display error message */}
          <form onSubmit={handleLogin}>
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

            <button type="submit" className="button">StaffLogin</button>
          </form>
          <p className="footer-text">
            Don't have an account? <Link to="/staff-register" className="link">Register</Link>
          </p>
        </div>
      </div>
      <StaffFooter />
    </div>
  );
};

export default StaffLogin;
