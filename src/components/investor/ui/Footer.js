// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-green-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and Contact Info */}
        <div id="contact">
          <img
            src="./REM-FARM.png"
            alt="Rem-Farms-Logo"
            className="mb-12 h-12 bg-white shadow-lg rounded lg:h-16"
          />
          <p className="mb-2">UK, United Kingdom</p>
          <p className="mb-2">📞 123-456-7890</p>
          <p className="mb-4">✉️ rem-farms.com</p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" aria-label="Facebook" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/home"
                onClick={handleScroll}
                className="hover:text-gray-300 cursor-pointer"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Mission Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Mission</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="hover:text-gray-300">
                Contacts
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-gray-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-gray-300"
                onClick={handleScroll}
              >
                FAQ Pages
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="mb-4">Subscribe to receive inspiration, ideas & news in your inbox</p>
          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-full sm:w-auto rounded-md border-none focus:outline-none text-black mb-2 sm:mb-0 sm:rounded-l-md"
            />
            <button className="bg-green-500 px-4 py-2 rounded-md sm:rounded-r-md text-white hover:bg-green-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; 2024 Rem-Farms. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
