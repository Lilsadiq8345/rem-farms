import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext'; // Ensure correct import

const NavBar = ({ toggleCartPanel }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false); // For toggling the cart view
  const { getCartCount, cartItems, removeFromCart, clearCart } = useCart(); // Added cartItems, removeFromCart, and clearCart

  const location = useLocation(); // Get the current location

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  const toggleCart = () => setCartOpen(!isCartOpen); // Toggle cart visibility

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
      <Link to="/" onClick={handleHomeClick} className="flex items-center">
        <img src="/REM-FARM.png" alt="REM Farms logo" className="w-10 h-10 md:w-20 md:h-20" />
        <h1 className="text-xl md:text-3xl font-bold ml-2 text-green-800">Rem-Farms</h1>
      </Link>

      {/* Navbar for larger screens */}
      <nav className="hidden md:flex items-center space-x-6 text-gray-700">
        <a
          href="/"
          onClick={handleHomeClick}
          className="cursor-pointer text-green-800 font-medium hover:text-green-700"
        >
          Home
        </a>
        <Link to="/products" className="hover:text-green-700 text-green-800">Markets</Link>
        <Link to="/about" className="hover:text-green-700 text-green-800">About Us</Link>
        <Link to="/contact" className="hover:text-green-700 text-green-800">Contact</Link>
      </nav>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Cart Icon */}
        <div className="relative">
          <button onClick={toggleCart} className="text-green-800">
            <FaShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className="absolute top-[-8px] left-[18px] bg-blue-500 text-white text-xs rounded-full px-1">
                {getCartCount()}
              </span>
            )}
          </button>

          {/* Cart Dropdown */}
          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50">
              <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
              <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center space-x-2">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-md" />
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-800">${item.price}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
                )}
              </ul>
              {cartItems.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={clearCart}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={toggleCartPanel}
                    className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            aria-label="Global options"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <img src="/global.png" alt="Global" className="w-5 h-5 mr-2" />

            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
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

          {/* Mobile Cart Icon */}
          <div className="flex items-center px-4 py-2 space-x-4">
            <button onClick={toggleCartPanel} className="text-green-800">
              <FaShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute top-[-8px] left-[18px] bg-blue-500 text-white text-xs rounded-full px-1">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default NavBar