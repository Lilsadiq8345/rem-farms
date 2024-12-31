import React from "react";

const CompactContactForm = () => {
  return (
    <div className="relative left-10 bg-gray-100 rounded-lg shadow-lg p-4 w-full max-w-sm" id="contact">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-left">
        Get in Touch
      </h3>
      <form className="space-y-3">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            placeholder="Your message"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default CompactContactForm;
