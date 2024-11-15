// src/components/NavBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to login page


const AdminNavBar = ({ cartItems }) => {
  const navigate = useNavigate(); // Use navigate to redirect to login



  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 py-2 bg-green-800">
      <div className="flex items-center">
        <img src="/REM-FARM-LOGO.png" alt="REM Farms brand" className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ml-4 text-white">REM Farms</h1>
      </div>
      <nav className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 mt-4 md:mt-0 text-white">
        <a href="#home" className="hover:text-gray-200 mt-2 md:mt-0">Home</a>
        <a href="#about" className="hover:text-gray-200">About Us</a>
        <a href="#products" className="hover:text-gray-200">Products</a>
        <a href="#faq" className="hover:text-gray-200">FAQ</a>
        <a href="#contact" className="hover:text-gray-200">Contact Us</a>
        <a href="#testimonials" className="hover:text-gray-200">Testimonials</a>
        
       

        <button onClick={() => navigate('/admin/login')} className="hover:text-gray-200 mt-2 md:mt-0">
          Login/Register
        </button>
      </nav>

     
    </header>
  );
};

export default AdminNavBar;
