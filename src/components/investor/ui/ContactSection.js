import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const CompactContactForm = () => {
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-lg p-6 lg:flex lg:justify-between lg:items-start lg:max-w-4xl mx-auto lg:p-10" id="contact">
      {/* Contact Form */}
      <div className="lg:w-1/2">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">Get in Touch</h3>
        <form className="space-y-4">
          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="p-2 bg-gray-100"><FaUser className="text-gray-500" /></span>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="p-2 bg-gray-100"><FaEnvelope className="text-gray-500" /></span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              placeholder="Write your message"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Side Content */}
      <div className="hidden lg:block lg:w-1/2 lg:pl-10">
        {/* Contact Info */}
        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-800">Contact Information</h4>
          <p className="text-gray-600 mt-2">We’d love to hear from you. Feel free to reach out through any of the methods below:</p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-center">
              <FaPhone className="text-green-500 mr-2" />
              <span>+44 123456789</span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="text-green-500 mr-2" />
              <span>rem-farms.co.uk</span>
            </li>
            <li className="flex items-center">
              <FaMapMarkerAlt className="text-green-500 mr-2" />
              <span>123 Unknow, London, UK</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompactContactForm;
