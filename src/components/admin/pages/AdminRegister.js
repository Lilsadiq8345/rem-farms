
import React from 'react';

const AdminRegister = ({ onRegister }) => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Register</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      onRegister(); // Call the register function
    }}>
      <label className="block mb-2">Username</label>
      <input type="text" className="block w-full p-2 mb-4 border" placeholder="Enter username" required />
      
      <label className="block mb-2">Email</label>
      <input type="email" className="block w-full p-2 mb-4 border" placeholder="Enter email" required />
      
      <label className="block mb-2">Password</label>
      <input type="password" className="block w-full p-2 mb-4 border" placeholder="Enter password" required />
      
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Register</button>
    </form>
  </div>
);

export default AdminRegister;