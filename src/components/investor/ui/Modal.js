import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl max-w-sm sm:max-w-md md:max-w-lg w-full text-center relative">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Please Pick an Option</h2>
        <p className="text-gray-600 mb-6 text-base sm:text-lg">Investor or Farmer Staff</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link
            to="/investor-register"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 ease-in-out w-full sm:w-auto"
          >
            Investor
          </Link>
          <Link
            to="/staff-register"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out w-full sm:w-auto"
          >
            Farmer Staff
          </Link>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
