import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const ContactSection = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-500 text-white mt-10 py-24" id="contact">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">Let’s Stay Connected</h1>
          <p className="text-lg font-medium max-w-2xl mx-auto">
            Reach out to us and explore our world of innovative farming solutions that shape the future of agriculture.
          </p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* CEO Contact */}
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">CEO Contact</h3>
            <p className="text-gray-600 mb-2">John Doe</p>
            <p className="text-gray-600 mb-2">Phone: <span className="text-green-700">+1 123-456-7890</span></p>
            <p className="text-gray-600 mb-2">Email: <span className="text-green-700">ceo@rem-farms.com</span></p>
            <p className="text-gray-600">123 Green Lane, London, UK</p>
          </div>

          {/* General Contact */}
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">General Inquiries</h3>
            <p className="text-gray-600 mb-2">Phone: <span className="text-green-700">+1 987-654-3210</span></p>
            <p className="text-gray-600 mb-2">Email: <span className="text-green-700">info@rem-farms.com</span></p>
            <p className="text-gray-600 mb-2">Support: <span className="text-green-700">support@rem-farms.com</span></p>
            <p className="text-gray-600">456 Farm Street, Manchester, UK</p>
          </div>

          {/* Manager Contact */}
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manager Inquiries</h3>
            <p className="text-gray-600 mb-2">Phone: <span className="text-green-700">+1 234-567-8901</span></p>
            <p className="text-gray-600 mb-2">Email: <span className="text-green-700">manager@rem-farms.com</span></p>
            <p className="text-gray-600 mb-2">Support: <span className="text-green-700">manager-support@rem-farms.com</span></p>
            <p className="text-gray-600">789 Harvest Lane, Birmingham, UK</p>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Us?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            At Rem-Farms, we bring innovation, sustainability, and passion to agriculture. Our mission is to empower farmers
            and communities with cutting-edge solutions that improve efficiency and productivity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Innovative Solutions</h3>
              <p className="text-gray-600">
                We deliver advanced farming technology tailored to meet the needs of modern agriculture.
              </p>
            </div>
            <div className="bg-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Our practices prioritize environmental care and the long-term well-being of the planet.
              </p>
            </div>
            <div className="bg-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Dedicated Support</h3>
              <p className="text-gray-600">
                Our team is always ready to assist, ensuring your farming journey is smooth and successful.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactSection;
