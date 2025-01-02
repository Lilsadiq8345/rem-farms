import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const NavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { getCartCount, cart, removeFromCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Smooth scroll to the top
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust this to the height of your fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle checkout action
  const handleCheckout = () => {
    const confirmAction = window.confirm('Continue as Sign In or Sign Up?');
    if (confirmAction) {
      navigate('/investor-register');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4"> {/* Logo */}
        <Link to="/" onClick={handleHomeClick} className="flex items-center">
          <img src="/REM-FARM.png" alt="REM Farms logo" className="w-10 h-10 md:w-20 md:h-20" />
          <h1 className="text-xl md:text-3xl font-bold ml-2 text-green-800">Rem-Farms</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          <a
            href="/"
            onClick={handleHomeClick}
            className="cursor-pointer text-green-800 font-medium hover:text-green-700"
          >
            Home
          </a>
          <Link to="/" className="hover:text-green-700 text-green-800"
            onClick={() => handleScroll("products")}>Markets</Link>
          <Link to="/" className="hover:text-green-700 text-green-800"
            onClick={() => handleScroll("about")}>About Us</Link>
          <Link to="/" className="hover:text-green-700 text-green-800"
            onClick={() => handleScroll("contact")}>Contact</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">


          {/* Cart Icon */}
          <div className="relative">
            <button onClick={() => setCartOpen(!isCartOpen)} className="text-green-800">
              <FaShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute top-[-8px] left-[18px] bg-blue-500 text-white text-xs rounded-full px-1">
                  {getCartCount()}
                </span>
              )}
            </button>
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50">
                <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {cart.length > 0 ? (
                    cart.map((item) => (
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
                {cart.length > 0 && (
                  <div className="mt-4 flex justify-between items-center">
                    <button onClick={handleCheckout} className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700">
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Global Dropdown */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <img src="/global.png" alt="Global" className="w-5 h-5 mr-2" />
              <FaChevronDown className="w-3 h-3" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                <Link to="/home" className="flex items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <img src="/uk.png" alt="UK Flag" className="w-5 h-5 mr-2" />
                  United Kingdom
                </Link>
                <Link to="/home" className="flex items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <img src="/nigeria.png" alt="Nigeria Flag" className="w-5 h-5 mr-2" />
                  Nigeria
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Button for Mobile */}
          <button
            onClick={() => setCartOpen(!isCartOpen)}
            className="flex items-center space-x-2 text-green-800 hover:text-green-700"
          >
            <FaShoppingCart size={20} />
            {getCartCount() > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-1">
                {getCartCount()}
              </span>
            )}
          </button>
          {/* Mobile Cart Dropdown */}
          {isCartOpen && (
            <div className="mt-2 w-full bg-white border-t border-gray-200 shadow-lg rounded-lg p-4 z-50">
              <h2 className="text-lg font-semibold text-gray-800">Cart Items</h2>
              <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                {cart.length > 0 ? (
                  cart.map((item) => (
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
              {cart.length > 0 && (
                <div className="mt-4 flex justify-between items-center">
                  <button onClick={handleCheckout} className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Global Dropdown in Mobile */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none mr-2"
            >
              <img src="/global.png" alt="Global" className="w-5 h-5 mr-1" />
              <FaChevronDown className="w-3 h-3" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                <Link to="/home" className="flex items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <img src="/uk.png" alt="UK Flag" className="w-5 h-5 mr-2" />
                  United Kingdom
                </Link>
                <Link to="/home" className="flex items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <img src="/nigeria.png" alt="Nigeria Flag" className="w-5 h-5 mr-2" />
                  Nigeria
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="flex flex-col p-4 space-y-2">
              <Link to="/" onClick={handleHomeClick} className="text-green-800 hover:text-green-700">
                Home
              </Link>
              <Link to="/" className="hover:text-green-700 text-green-800"
                onClick={() => handleScroll("products")}>
                Markets
              </Link>
              <Link to="/" className="hover:text-green-700 text-green-800"
                onClick={() => handleScroll("about")}>
                About Us
              </Link>
              <Link to="/" className="hover:text-green-700 text-green-800"
                onClick={() => handleScroll("contact")}>
                Contact
              </Link>

            </nav>

          </div>
        )
      }

    </header >
  );
};

export default NavBar;