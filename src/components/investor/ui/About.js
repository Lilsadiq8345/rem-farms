import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import '../../../App.css';

const About = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="about"
        className="mt-20 py-12 px-6 max-w-7xl mx-auto text-center bg-gradient-to-r from-green-700 to-teal-500 text-white rounded-lg shadow-lg lg:flex lg:items-center lg:gap-10"
      >
        <div className="lg:w-1/2">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-poppins"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to REM Farms
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-light leading-relaxed font-poppins"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            At REM Farms, we bring agriculture and technology together, enabling sustainable farming and profitable investment opportunities for everyone.
          </motion.p>
        </div>
        <motion.img
          src="/farm.jpeg"
          alt="Farming Illustration"
          className="mt-8 lg:mt-0 lg:w-1/2 rounded-lg shadow-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto text-center px-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-green-800 mb-8">About Us</h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto mb-6">
            REM Farms is a leading platform in agricultural innovation. By providing tools for investors to contribute to farming projects, we ensure a seamless connection between agriculture and technology.
          </p>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            With our platform, farmers gain access to much-needed resources, and investors receive returns on their investments while supporting sustainable agriculture.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6 lg:flex lg:gap-12 lg:items-center">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-bold text-green-800 mb-6">Our Mission</h3>
            <p className="text-gray-600 text-lg mb-4">
              To empower individuals and communities through innovative agricultural investments that create sustainable growth and shared prosperity.
            </p>
            <p className="text-gray-600 text-lg">
              We envision a future where technology bridges the gap between investors and farmers, fostering collaboration and profitability for all.
            </p>
          </motion.div>
          <motion.img
            src="/mission.jpeg"
            alt="Mission Illustration"
            className="mt-8 lg:mt-0 lg:w-1/2 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center px-6">
          <h3 className="text-3xl font-bold text-green-800 mb-8">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-green-100 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-green-800 mb-4">Transparency</h4>
              <p className="text-gray-600">
                We prioritize honesty and openness in all our dealings to build trust and long-lasting relationships.
              </p>
            </div>
            <div className="p-6 bg-green-100 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-green-800 mb-4">Sustainability</h4>
              <p className="text-gray-600">
                We are committed to sustainable farming practices that benefit the environment and communities.
              </p>
            </div>
            <div className="p-6 bg-green-100 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-green-800 mb-4">Innovation</h4>
              <p className="text-gray-600">
                Our platform leverages the latest technology to deliver value to investors and farmers alike.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;