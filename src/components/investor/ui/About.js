import React from 'react';
import { motion } from 'framer-motion';
import '../../../App.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section
      id="about"
      className="py-12 px-6 max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-lg lg:flex lg:items-center lg:gap-10"
    >
      {/* Left Section */}
      <motion.div
        className="text-center lg:text-left lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-green-700">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          At <span className="font-semibold">REM Farms</span>, we bridge the
          gap between technology and agriculture to create opportunities that
          benefit farmers, investors, and the environment. We are committed to
          empowering communities and ensuring a sustainable future through
          innovation and collaboration.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our platform connects investors with cutting-edge farming projects,
          offering a secure and rewarding investment opportunity. At the same
          time, we provide farmers with the tools and resources needed to
          enhance productivity and adopt sustainable practices.
        </p>
        <Link to=""
          className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition-all"
        > Learn More</Link>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="hero3.jpeg"
          alt="About Us Illustration"
          className="rounded-md shadow-lg w-80 h-80 object-cover"
        />


      </motion.div>
    </section>
  );
};

export default About;
