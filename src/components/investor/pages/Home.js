import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import Navbar from '../ui/Navbar';
import PricingPlans from '../pages/PricingPlans';
import { motion } from 'framer-motion';
import './Home.css';

const Home = ({ setCartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const closeModal = () => setIsModalOpen(false);
  const handleGetStartedClick = () => setIsModalOpen(true);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScrollPosition(scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <ScrollToTop />
      <Modal isOpen={isModalOpen} onClose={closeModal} />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-green-200 to-blue-100 py-12 hero flex items-center justify-center mt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto h-auto text-white"
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mt-20 px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0">
          {/* Text on the left */}
          <motion.div
            className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 text-left px-4 sm:px-6 md:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-green-800 mb-4 sm:mb-5 md:mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                transform: `translateY(${scrollPosition * 0.1}px)`,
              }}
            >
              Welcome to Rem-Farms
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              Empowering agriculture through technology. Join us to invest, grow, and transform farming for the future.
            </motion.p>
            <motion.button
              className="bg-green-800 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-lg"
              onClick={handleGetStartedClick}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Organic Farming Section */}
      <motion.section
        className="organic-farming-section flex flex-col lg:flex-row items-center max-w-5xl mx-auto my-2 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1 mb-6 lg:mb-0 lg:mr-6">
          <motion.img
            src="/organic_farmer.jpeg"
            alt="Organic product"
            className="w-full rounded-lg object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        </div>
        <div className="flex-1 text-left">
          <motion.h2
            className="text-4xl font-serif text-green-700 mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Agriculture & Organic Product Farm
          </motion.h2>
          <motion.p
            className="text-gray-700 text-base mb-4 font-serif"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            We ensure top-quality, organic farming techniques that yield fresh, sustainable products for a greener future.
          </motion.p>
          <motion.ul
            className="list-none space-y-2 mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
          >
            <motion.li
              className="flex items-center text-gray-800 text-base font-Georgia"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-green-600 mr-2">✔️</span> Guaranteed Organic Products
            </motion.li>
            <motion.li
              className="flex items-center text-gray-800 text-base font-Georgia"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-green-600 mr-2">✔️</span> Sustainable Agriculture Practices
            </motion.li>
            <motion.li
              className="flex items-center text-gray-800 text-base font-Georgia"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-green-600 mr-2">✔️</span> High-Quality Mediterranean Crops
            </motion.li>
          </motion.ul>
        </div>
      </motion.section>

      {/*Market Place Section*/}
      <motion.section
        className="bloom-of-the-day my-8 mx-auto text-center max-w-5xl mt-4"
        id="products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-semibold text-black mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Market Place
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Explore our diverse range of premium products that cater to all your farming needs.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="./product.jpeg"
              alt="Products"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Best Products</h3>
            <p className="text-gray-600 mb-4">
              Premium quality products, specially crafted for your agricultural needs.
            </p>
            <Link to="/best-products" className="text-green-500 font-semibold">
              Discover More
            </Link>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src="./product2.jpeg"
              alt="Dairy Products"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Popular Dairy Products</h3>
            <p className="text-gray-600 mb-4">
              Explore our rich, fresh dairy products sourced from the best local farms.
            </p>
            <Link to="/dairy-products" className="text-green-500 font-semibold">
              Discover More
            </Link>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="./product3.jpeg"
              alt="Fresh Produce"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Fresh Produce</h3>
            <p className="text-gray-600 mb-4">
              Fresh and organic produce delivered right from farm to your doorstep.
            </p>
            <Link to="/fresh-produce" className="text-green-500 font-semibold">
              Discover More
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <PricingPlans />

      {/*Explore Our Projects Section*/}
      < section className="explore-projects-section my-12 mx-auto text-center max-w-5xl" >
        <motion.h2
          className="text-4xl font-semibold text-black"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore Our Projects
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Discover how Rem-Farms is revolutionizing agriculture with innovative projects.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="./images1.jpeg"
              alt="Project 1"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Sustainable Agriculture</h3>
            <p className="text-gray-600 mb-4">
              Aiming for a greener future through sustainable farming practices.
            </p>
            <Link to="/sustainable-agriculture" className="text-green-500 font-semibold">
              Learn More
            </Link>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="./images2.jpeg"
              alt="Project 2"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Innovative Technologies</h3>
            <p className="text-gray-600 mb-4">
              Implementing modern technologies to boost farming productivity.
            </p>
            <Link to="/innovative-technologies" className="text-green-500 font-semibold">
              Learn More
            </Link>
          </motion.div>

          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="./images3.jpeg"
              alt="Project 3"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Organic Farming</h3>
            <p className="text-gray-600 mb-4">
              Focused on providing high-quality organic products from farm to table.
            </p>
            <Link to="/organic-farming" className="text-green-500 font-semibold">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section >

      {/* Footer */}
      < Footer />
    </>
  );
};

export default Home;
