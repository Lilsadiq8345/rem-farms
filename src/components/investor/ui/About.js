import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLeaf, FaTractor, FaHandshake } from 'react-icons/fa';

const About = () => {
  return (
    <section
      id="about"
      className="py-16 px-8 max-w-7xl mx-auto bg-white rounded-lg shadow-md lg:flex lg:items-center lg:gap-12"
    >
      {/* Left Section */}
      <motion.div
        className="text-center lg:text-left lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-extrabold text-green-700 mb-8">
          About REM Farms
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          At <span className="font-semibold">REM Farms</span>, we bridge the gap between technology and agriculture,
          creating opportunities that benefit farmers, investors, and the environment.
          We are committed to empowering communities and ensuring a sustainable future through innovation and collaboration.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our platform connects investors with cutting-edge farming projects,
          offering secure and rewarding investment opportunities.
          At the same time, we provide farmers with the tools and resources to enhance productivity and adopt sustainable practices.
        </p>
        <Link
          to=""
          className="inline-block bg-green-600 text-white py-3 px-8 text-lg font-medium rounded-lg shadow-lg hover:bg-green-700 transition-all"
        >
          Learn More
        </Link>
      </motion.div>

      {/* Right Section: Feature Highlights */}
      <motion.div
        className="mt-8 lg:mt-0 lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Feature 1 */}
        <div className="text-center">
          <FaLeaf className="text-green-700 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Sustainability</h3>
          <p className="text-gray-600">
            Promoting eco-friendly farming practices for a greener future.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="text-center">
          <FaTractor className="text-green-700 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Innovation</h3>
          <p className="text-gray-600">
            Leveraging modern technology to boost productivity.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="text-center">
          <FaHandshake className="text-green-700 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Collaboration</h3>
          <p className="text-gray-600">
            Building strong partnerships between farmers and investors.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
