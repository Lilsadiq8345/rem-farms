// src/components/investor/pages/Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

const InvestorLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  // Scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: 'smooth', // Smooth scrolling
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when login attempt begins

    try {
      const response = await axios.post('https://rem-farms.onrender.com/api/auth/login', {
        email,
        password,
      });

      // If login is successful, navigate to the dashboard
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Store token in localStorage
        navigate('/investor-dashboard');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setLoading(false); // Stop loading when login attempt ends
    }
  };

  return (
    <div className="">
      <Navbar />
      <div
        id="investor-login"
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
          <h2 className="title">Login</h2>
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

            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="footer-text">
            Don't have an account? <Link to="/investor-register" className="link">Register</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InvestorLogin;
