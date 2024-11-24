import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import './Home.css';

const Home = ({ setCartItems }) => {
  const [currentText, setCurrentText] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const rotatingTexts = [
    "Invest in Agriculture",
    "Grow Your Wealth",
    "Support Sustainable Farming",
    "Secure Your Future"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [rotatingTexts.length]);

  const handleGetStartedClick = () => {
    setIsModalOpen(true);
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
            <img src="/REM-FARM-LOGO.png" alt="REM Farms brand" className="w-10 h-10 md:w-20 md:h-20" />
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
      <section
        className="hero flex items-center justify-start p-4 sm:p-10 min-h-screen text-white relative"
        id="home"
        style={{
          backgroundImage: 'url("/hero3.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="text-container bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg animate-fade-in-left">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
            {rotatingTexts[currentText]}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base mb-4">
            REM Farms is your gateway to profitable agricultural investments. Join us in supporting sustainable farming and making a real impact on food security and the environment.
          </p>
        </div>
      </section>

      {/* Organic Farming Section */}
      <section className="organic-farming-section flex flex-col lg:flex-row items-center max-w-5xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
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
      </section>
      {/* Market Place Section */}
      <section className="bloom-of-the-day my-12 mx-auto text-center max-w-5xl" id="products">
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
      </section>


      {/* Explore Our Projects Section */}
      <section className="explore-projects-section my-12 mx-auto text-center max-w-5xl">
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
      </section>

      {/* Latest Updated News Section */}
      <section className="latest-news-section my-12 mx-auto text-center max-w-6xl px-4">
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
      </section>
      <Footer />
    </>
  );
};

export default Home;