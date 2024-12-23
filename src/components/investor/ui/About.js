import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import '../../../App.css';

const About = () => {
  return (
    <>
      {/* About Us Section */}

      <section
        id="about"
        className="mt-40 mb-12 p-6 max-w-6xl mx-auto text-center bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-xl shadow-lg lg:flex lg:items-center lg:gap-6"
      >
        <Navbar />
        <div className="lg:w-1/2">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-poppins">About Us</h3>
          <p className="text-lg leading-7 font-poppins">
            REM Farms is a future-oriented agricultural investment platform. Our goal is to empower
            investors to participate in sustainable agricultural ventures. With a focus on transparency,
            profitability, and easy access, we bridge the gap between technology and farming.
          </p>
        </div>
        <img
          src="/farm.jpeg"
          alt="Farming Illustration"
          className="mt-6 lg:mt-0 lg:w-1/2 rounded-lg shadow-md"
        />
      </section>
      {/* About Section */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-green-800 mb-6">About Us</h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto">
            At Rem-Farms, we connect investors and farmers through our innovative platform. Whether you're looking to invest in agriculture or purchase farm products, we provide the tools you need to succeed.
          </p>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default About;
