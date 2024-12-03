// src/components/NavBar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const NavBar = ({ cartCount = 0, toggleCartPanel }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const location = useLocation(); // Get the current location

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  // Smooth scroll to the top
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
      {/* Logo */}
      <Link to="/" onClick={handleHomeClick} className="flex items-center">
        <img
          src="/REM-FARM.png"
          alt="REM Farms logo"
          className="w-10 h-10 md:w-20 md:h-20"
        />
        <h1 className="text-xl md:text-3xl font-bold ml-2 text-green-800">
          Rem-Farms
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6 text-gray-700">
        <a
          href="/"
          onClick={handleHomeClick}
          className="cursor-pointer text-green-800 font-medium hover:text-green-700"
        >
          Home
        </a>
        <Link to="/products" className="hover:text-green-700 text-green-800">
          Markets
        </Link>
        <Link to="/about" className="hover:text-green-700 text-green-800">
          About Us
        </Link>
        <Link to="/contact" className="hover:text-green-700 text-green-800">
          Contact
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Cart Icon */}
        <div className="relative">
          <button onClick={toggleCartPanel} className="text-green-800">
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Global Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            aria-label="Global options"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <img src="/global.png" alt="Global" className="w-5 h-5 mr-2" />
            <span>Global</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
              <Link to="/uk" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <img src="/uk.png" alt="UK Flag" className="w-5 h-5 mr-2" />
                United Kingdom
              </Link>
              <Link to="/nigeria" className="flex items-center px-4 py-2 hover:bg-gray-100">
                <img src="/nigeria.png" alt="Nigeria Flag" className="w-5 h-5 mr-2" />
                Nigeria
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md rounded-lg py-2 z-10">
          <a
            href="/"
            onClick={handleHomeClick}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </a>
          <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Market Place
          </Link>
          <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            About Us
          </Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
