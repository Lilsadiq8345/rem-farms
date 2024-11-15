import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your authentication logic here

    // If Adminlogin is successful, navigate to dashboard
    navigate('/admin/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-800 text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Login</h2>
      <form onSubmit={handleSubmit} className="bg-white text-green-900 p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 border rounded"
            required 
          />
        </div>
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
          Admin Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
