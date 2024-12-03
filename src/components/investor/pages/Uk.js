
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import PricingPlans from '../pages/PricingPlans';
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import './Home.css';

const Uk = ({ setCartItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [cartCount] = useState(0);

    const closeModal = () => {
        // Logic to close the modal
    };


    const navigate = useNavigate();

    const handleGetStartedClick = () => setIsModalOpen(true);



    const toggleCartPanel = () => {
        console.log("Cart panel toggled");
        // Add logic to open/close cart panel
    };




    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const handleHomeClick = (e) => {
        e.preventDefault();
        if (window.location.pathname !== "/") {
            navigate('/');
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    const points = [
        { title: 'Expert Investment Team', description: 'Our team ensures your investments are in capable hands.' },
        { title: 'Disciplined Investment Philosophy', description: 'We adhere to sustainable and profitable ventures.' },
        { title: 'Proprietary Sourcing Technology', description: 'Utilizing advanced technology for exclusive opportunities.' },
        { title: 'Crop Rotation and Diversity', description: 'We implement practices to boost crop yields sustainably.' },
    ];

    return (
        <>
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
                <Link to="/" onClick={handleHomeClick} className="flex items-center">
                    <img src="/REM-FARM.png" alt="REM Farms logo" className="w-10 h-10 md:w-20 md:h-20" />
                    <h1 className="text-xl md:text-3xl font-bold ml-2 text-green-800">Rem-Farms</h1>
                </Link>

                {/* Navbar for larger screens */}
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

                <div className="flex items-center space-x-4">

                    {/* Cart Icon */}
                    <div className="relative">
                        <button onClick={toggleCartPanel} className="text-green-800">
                            <FaShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Navbar */}
                    <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-white shadow-md z-50">
                        {/* Logo and Website Name */}
                        <Link to="/" onClick={handleHomeClick} className="flex items-center">
                            <img src="/REM-FARM.png" alt="REM Farms logo" className="w-10 h-10 md:w-20 md:h-20" />
                            <h1 className="text-xl md:text-3xl font-bold ml-2 text-green-800">Rem-Farms</h1>
                        </Link>

                        {/* Navbar for larger screens */}
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

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Cart Icon */}
                            <div className="relative">
                                <button onClick={toggleCartPanel} className="text-green-800">
                                    <FaShoppingCart size={24} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Global Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    aria-label="Global options"
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                                >
                                    <img src="/global.png" alt="Global" className="w-5 h-5 mr-2" />
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
                                        <Link to="#uk" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                            <img src="/uk.png" alt="UK Flag" className="w-5 h-5 mr-2" />
                                            United Kingdom
                                        </Link>
                                        <Link to="/nigeria" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                            <img src="/nigeria.png" alt="Nigeria Flag" className="w-5 h-5 mr-2" />
                                            Nigeria
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </header>

                    {/* Mobile Navigation */}
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

                            {/* Mobile Cart Icon */}
                            <div className="flex items-center px-4 py-2 space-x-4">
                                <button onClick={toggleCartPanel} className="text-green-800">
                                    <FaShoppingCart size={24} />
                                    {cartCount > 0 && (
                                        <span className="bg-blue-500 text-white text-xs rounded-full px-1 ml-1">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Mobile Global Dropdown */}
                            <div className="relative px-4 py-2">
                                <button
                                    onClick={toggleDropdown}
                                    aria-label="Global options"
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                                >
                                    <img src="/global.png" alt="Global" className="w-5 h-5 mr-2" />
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
                                        <Link to="/uk" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                            <img src="/uk.png" alt="UK Flag" className="w-5 h-5 mr-2" />
                                            United Kingdom
                                        </Link>
                                        <Link to="/nigeria" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                            <img src="/nigeria.png" alt="Nigeria Flag" className="w-5 h-5 mr-2" />
                                            Nigeria
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* Mobile Navigation */}
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


            {/* Main Content */}
            < ScrollToTop />
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            {/* Hero Section */}
            <motion.div
                className="p-6 bg-white shadow-md rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <section className="bg-gradient-to-r from-green-200 to-blue-100 py-12 hero flex items-center justify-start mt-20 px-4 sm:px-10 mx-auto h-auto text-white" id="home">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6  text-green-800">Sustainable Farm Investing Made Simple</h1>
                            <p className="text-lg mb-6  text-gray-600">
                                Join a community of forward-thinking investors and farmers committed to sustainable
                                and profitable ventures. We connect you with innovative projects that promote sustainability and ensure food security.
                            </p>
                            <button className="bg-green-800 hover:bg-green-700 text-white  px-6 py-3 rounded-md font-semibold">
                                Get Started
                            </button>
                        </div>
                        <div className="md:w-1/2 flex justify-center">
                            <img src="/REM-FARM.png" alt="Farmer" className="rounded-md shadow-lg w-40 h-40" />
                        </div>
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
                            <h3 className="text-xl font-semibold text-green-700 mb-4">Farm Selection & Entity Creation</h3>
                            <p className="text-gray-600">
                                We diligently identify high-potential farms with proven productivity and market relevance.
                            </p>
                        </motion.div>



                        <motion.div
                            className="p-6 bg-white shadow-md rounded-lg text-center"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-xl font-semibold text-green-700 mb-4">Farm Management - Produce Goods & Sell</h3>
                            <p className="text-gray-600">
                                Our skilled farm managers oversee every stage of cultivation, from planting to harvesting.
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-6 bg-white shadow-md rounded-lg text-center"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-xl font-semibold text-green-700 mb-4">Distributions - Withdraw or Reinvest</h3>
                            <p className="text-gray-600">
                                Once products are sold, profits are distributed or reinvested into new cycles for maximum returns.
                            </p>
                        </motion.div>
                    </div>
                </section>
            </motion.div>




            {/* Organic Farming Section */}
            <motion.div
                className="p-6 bg-white shadow-md rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
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
            </motion.div>


            <motion.div
                className="p-6 bg-white shadow-md rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <section className="bg-gradient-to-r from-green-200 to-blue-100 py-12 hero flex items-center justify-start mt-20 px-4 sm:px-10 mx-auto h-auto text-green">

                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-green-800">Sustainable Agriculture Practices</h2>
                            <p className="mb-6">Promoting environmentally-friendly farming methods for long-term ecological balance.</p>
                            <ul className="space-y-4">
                                {points.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="bg-green text-green p-2 rounded-full mr-4">✔</span>
                                        <div>
                                            <h4 className="font-semibold">{point.title}</h4>
                                            <p className="text-sm">{point.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-center">
                            <img src="/hero4.jpeg" alt="Agriculture" className="rounded-md shadow-lg w-80 h-80" />
                        </div>
                    </div>
                </section>
            </motion.div>


            {/* Market Place Section */}
            <motion.div
                className="p-6 bg-white shadow-md rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
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
            </motion.div>

            <PricingPlans />

            {/* Explore Our Projects Section */}
            <motion.div
                className="p-6 bg-white shadow-md rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
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
            </motion.div>

            {/* Latest Updated News Section */}
            <motion.div
                className="p-6 bg-white shadow-md rounded-lg text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
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
            </motion.div>
            <Footer />
        </>
    );
};

export default Uk;
