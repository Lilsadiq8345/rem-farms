import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import PricingPlans from '../pages/PricingPlans';
import { motion } from "framer-motion";
import './Home.css';

const Home = ({ setCartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const [cart] = useState([]);
  const [setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
  };


  const handleCheckout = () => {
    if (!localStorage.getItem('user')) {
      setLoginModalOpen(true);
    } else {
      navigate('/checkout');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      // If not on the home page, navigate to home first
      window.location.href = "/";
    } else {
      // If already on the home page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar Section */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
        <Link to="/home" onClick={handleHomeClick}>
          <div className="flex items-center">
            <img src="/REM-FARM.png" alt="REM Farms brand" className="w-10 h-10 md:w-20 md:h-20" />
            <h1 className="text-xl md:text-3xl font-bold ml-2 text-green-800">Rem-Farms</h1>
          </div>
        </Link>

        {/* Navigation Links for Larger Screens */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          <a
            href="/"
            onClick={handleHomeClick}
            className="cursor-pointer text-green-800 font-medium hover:text-green-700"
          >
            Home
          </a>
          <Link to="/products" className="hover:text-green-700 text-green-800">Markets</Link>
          <Link to="/about" className="hover:text-green-700 text-green-800">About Us</Link>
          <Link to="/contact" className="hover:text-green-700 text-green-800">Contact</Link>
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center space-x-4">
          <button onClick={handleCheckout} className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4-8M17 13a4 4 0 11-8 0m8 0a4 4 0 11-8 0" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Global Dropdown and Search Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16z" />
              </svg>
              <span>Global</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg">
                <a href="#uk" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <img src="/uk.png" alt="UK Flag" className="w-5 h-5 mr-2" />
                  United Kingdom
                </a>
                <a href="#nigeria" className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <img src="/nigeria.png" alt="Nigeria Flag" className="w-5 h-5 mr-2" />
                  Nigeria
                </a>
              </div>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md rounded-lg py-2 z-10">
            <a
              href="/"
              onClick={handleHomeClick}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Home
            </a>
            <Link to="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Market Place
            </Link>
            <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              About Us
            </Link>
            <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Contact
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <ScrollToTop />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-200 to-blue-100 py-12 hero flex items-center justify-start mt-20 px-4 sm:px-10 mx-auto h-auto text-white" id="home">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start">
          {/* Text on the left */}
          <motion.div
            className="lg:w-1/2 w-full text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.h1
              className="text-5xl font-extrabold text-green-800 mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
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
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Image on the right */}
          <motion.div
            className="lg:w-1/2 w-full mb-8 lg:mb-0 flex justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/hero3.jpeg"
              alt="Rem-Farms"
              className="mx-auto lg:mx-0 w-64 h-64 md:w-96 md:h-96 lg:w-[250px] lg:h-[250px] object-cover rounded-lg border-4 shadow-lg shadow-green-500/50"
            />
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section className="bg-gradient-to-r from-green-200 to-blue-100 py-12 hero flex items-center justify-start  px-4 sm:px-10 mx-auto h-auto text-white">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <motion.div
            className="p-6 bg-white shadow-md rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-4">Marketplace</h3>
            <p className="text-gray-600">
              Buy and sell agricultural products on our trusted marketplace platform.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white shadow-md rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-4">Investments</h3>
            <p className="text-gray-600">
              Grow your financial future by investing in sustainable farming projects.
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-white shadow-md rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-green-700 mb-4">Support</h3>
            <p className="text-gray-600">
              Need assistance? We're here to help you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>





      {/* Organic Farming Section */}
      < section className="organic-farming-section flex flex-col lg:flex-row items-center max-w-5xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md" >
        <div className="flex-1 mb-6 lg:mb-0 lg:mr-6">
          <img
            src="/organic_farmer.jpeg"
            alt="Organic product"
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-4xl font-chalkduster text-green-700 mb-4">
            Agriculture & Organic Product Farm
          </h2>
          <p className="text-gray-600 mb-4 text-lg">
            There are many variations of passages of ipsum available but the majority have suffered alteration in some form by injected humor or random word which don’t look even.
          </p>
          <ul className="list-none space-y-2 mb-6">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔️</span> Guaranteed Organic Product
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔️</span> Intensive subsistence agriculture
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✔️</span> Mediterranean crops are very important
            </li>
          </ul>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
        </div>
      </section >

      <section className="relative bg-green-800 text-white py-16 px-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/hero3.jpeg')" }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            What Sets Our <span className="text-green-300">Position</span> Apart
          </h2>
          <p className="mt-4 text-lg">
            At rem-farms, we offer unique advantages that make our agri-investments stand out.
            Explore the key benefits of partnering with us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="flex items-center space-x-4">

              <div>
                <h3 className="text-xl font-semibold">Safe Haven Investment</h3>
                <p className="mt-2 text-sm">
                  Invest with peace of mind knowing your assets are in a secure and stable
                  environment.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">

              <div>
                <h3 className="text-xl font-semibold">Uncorrelated Returns</h3>
                <p className="mt-2 text-sm">
                  Benefit from returns that are independent of traditional market fluctuations,
                  providing stability.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">

              <div>
                <h3 className="text-xl font-semibold">Superior Inflation Hedge</h3>
                <p className="mt-2 text-sm">
                  Protect your investments against inflation with rem-farms assets that tend to
                  increase in value over time.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">

              <div>
                <h3 className="text-xl font-semibold">Attractive Yields</h3>
                <p className="mt-2 text-sm">
                  Enjoy competitive yields from well-managed rem-farms investments, designed to
                  maximize your returns.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-12">
            <img
              src="/rem22.png"
              alt="Farmer"
              className="w-70 h-auto rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </section>



      {/* Market Place Section */}
      < section className="bloom-of-the-day my-12 mx-auto text-center max-w-5xl" id="products" >
        <h2 className="text-4xl font-semibold text-black mb-4">Market Place</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          There are many variations of passages of Lorem available but the majority have suffered alteration by
          injected humour or randomised words which don't look even slightly believable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img src="./product.jpeg" alt="Products" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Best Products</h3>
            <p className="text-gray-600 mb-4">
              There are so many variations of passages more available but the majority have suffered alteration some form.
            </p>
            <Link to="/best-products" className="text-green-500 font-semibold">Discover More</Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img src="./product2.jpeg" alt="Dairy Products" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Popular Dairy Products</h3>
            <p className="text-gray-600 mb-4">
              There are so many variations of passages more available but the majority have suffered alteration some form.
            </p>
            <Link to="/dairy-products" className="text-green-500 font-semibold">Discover More</Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img src="./product3.jpg" alt="Quality Farming" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">High Quality Farming</h3>
            <p className="text-gray-600 mb-4">
              There are so many variations of passages more available but the majority have suffered alteration some form.
            </p>
            <Link to="/quality-farming" className="text-green-500 font-semibold">Discover More</Link>
          </div>
        </div>
      </section >

      <PricingPlans />

      {/* Explore Our Projects Section */}
      < section className="explore-projects-section my-12 mx-auto text-center max-w-5xl" >
        <h2 className="text-4xl font-semibold text-black mb-4 font-chalkduster">Explore Our Projects</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration by injected humour or randomised words which don't look even slightly believable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Origins Of Agriculture Card */}
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="./product4.jpeg" alt="Origins of Agriculture" className="w-full h-56 object-cover opacity-75" />
            <Link to="/origins-of-agriculture" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 shadow-ld">
              Origins Of Agriculture
            </Link>
          </div>

          {/* Commercial Tool Grain Card */}
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="./product5.jpeg" alt="Commercial Tool Grain" className="w-full h-56 object-cover opacity-75" />
            <Link to="./commercial-tool-grain" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 shadow-ld">
              Commercial Tool Grain
            </Link>
          </div>

          {/* Grain Water Farming Card */}
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="./product6.jpeg" alt="Grain Water Farming" className="w-full h-56 object-cover opacity-75" />
            <Link to="/grain-water-farming" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 shadow-ld">
              Grain Water Farming
            </Link>
          </div>
        </div>
      </section >

      {/* Latest Updated News Section */}
      < section className="latest-news-section my-12 mx-auto text-center max-w-6xl px-4" >
        <h2 className="text-4xl font-semibold text-black mb-4 font-italic">Latest Updated News</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration by injected humour or randomised words which don't look even slightly believable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* News Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="./images1.jpeg" alt="Luscious Organic Produce" className="w-full h-56 object-cover" />
            <div className="p-4 text-left">
              <p className="text-gray-500 flex items-center mb-2">
                <span className="mr-2">📅</span> November 06, 2024
              </p>
              <h3 className="text-xl font-semibold text-black mb-2">Luscious Organic Produce</h3>
              <p className="text-gray-600 mb-4">Specialized horticulture Specialized horticulture arose as a result of</p>
              <a href="/read-more-1" className="text-green-600 font-semibold hover:underline">Read More</a>
            </div>
          </div>

          {/* News Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="./images2.jpeg" alt="Benefits Of Organic Food" className="w-full h-56 object-cover" />
            <div className="p-4 text-left">
              <p className="text-gray-500 flex items-center mb-2">
                <span className="mr-2">📅</span> May 27, 2024
              </p>
              <h3 className="text-xl font-semibold text-black mb-2">Benefits Of Organic Food</h3>
              <p className="text-gray-600 mb-4">Rudimentary Sedentary Tillage Nomads move with their animals from one place</p>
              <a href="/read-more-2" className="text-green-600 font-semibold hover:underline">Read More</a>
            </div>
          </div>

          {/* News Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="./images3.jpeg" alt="Buy Only Organic Products" className="w-full h-56 object-cover" />
            <div className="p-4 text-left">
              <p className="text-gray-500 flex items-center mb-2">
                <span className="mr-2">📅</span> May 07, 2024
              </p>
              <h3 className="text-xl font-semibold text-black mb-2">Buy Only Organic Products</h3>
              <p className="text-gray-600 mb-4">Commercial Plantations It is commonly practiced in regions with European</p>
              <a href="/read-more-3" className="text-green-600 font-semibold hover:underline">Read More</a>
            </div>
          </div>
        </div>
      </section >
      <Footer />
    </>
  );
};

export default Home;