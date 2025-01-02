import React from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactSection = () => {
  return (
    <>
      <Navbar />
      <div className="relative bg-white shadow-lg rounded-lg p-6 mt-16 max-w-full mx-auto lg:flex lg:justify-between lg:items-start lg:p-10" id="contact">
        <div className="lg:w-1/2 w-full">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center lg:text-left">Contact Us</h3>
          <form className="space-y-5">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                <span className="p-2 bg-gray-100">
                  <FaUser className="text-gray-600" />
                </span>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 text-gray-800 focus:outline-none"
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                <span className="p-2 bg-gray-100">
                  <FaEnvelope className="text-gray-600" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-gray-800 focus:outline-none"
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                placeholder="Write your message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactSection;
