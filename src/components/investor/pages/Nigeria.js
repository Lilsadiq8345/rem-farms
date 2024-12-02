import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import PricingPlans from '../pages/PricingPlans';
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import './Home.css';

const Nigeria = ({ setCartItems }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [cartCount] = useState(0);

    const closeModal = () => {
        // Logic to close the modal
    };

    const navigate = useNavigate();


    const toggleCartPanel = () => {
        console.log("Cart panel toggled");
        // Add logic to open/close cart panel
    };

    const handleGetStartedClick = () => setIsModalOpen(true);

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

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const steps = [
        {
            title: "Step 1",
            description: "Select your risk tolerance",
            iconColor: "bg-purple-300",
            details:
                "Choosing your risk tolerance is the first step to building your portfolio. Whether you're a conservative investor seeking stability or a risk-taker chasing higher returns, we provide options that suit your comfort level and financial goals. Learn more about risk categories and their performance trends to make an informed choice.",
        },
        {
            title: "Step 2",
            description: "Set your investment goal",
            iconColor: "bg-orange-300",
            details:
                "Your investment goals define your strategy. Whether you’re saving for retirement, funding your dream home, or just looking to grow wealth, we help you align your goals with a tailored portfolio. Define your target timeline and financial aspirations, and we’ll guide you every step of the way.",
        },
        {
            title: "Step 3",
            description: "Fund your account",
            iconColor: "bg-teal-300",
            details:
                "Funding your account is quick and secure. Choose from multiple payment options to start your investment journey. Our platform ensures your transactions are encrypted and hassle-free, so you can begin growing your portfolio with confidence.",
        },
        {
            title: "Step 4",
            description: "We'll take care of the rest",
            iconColor: "bg-yellow-300",
            details:
                "Sit back and relax as we manage your investments. Our team of experts and advanced algorithms work together to monitor the markets, rebalance your portfolio when necessary, and ensure your assets are performing optimally. Enjoy peace of mind knowing your investments are in capable hands.",
        },
    ];

    return (
        <>
            < ScrollToTop />
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
                                <a href="#uk" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <img src="/uk.png" alt="UK Flag" className="w-5 h-5 mr-2" />
                                    United Kingdom
                                </a>
                                <a href="/nigeria" className="flex items-center px-4 py-2 hover:bg-gray-100">
                                    <img src="/nigeria.png" alt="Nigeria Flag" className="w-5 h-5 mr-2" />
                                    Nigeria
                                </a>
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
                    <div className="flex items-center justify-center mt-4">
                        <button onClick={toggleCartPanel} className="text-gray-700">
                            <FaShoppingCart size={24} />
                        </button>
                    </div>

                </nav>
            )}


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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-6 max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-bold text-gray-800">Build Real Wealth</h3>
                    <p className="text-gray-600 mt-2">
                        Get access to professional-grade investments. Beat inflation with a
                        diversified portfolio of stocks, gold, and sukuk, managed by
                        investment experts.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-bold text-gray-800">
                        Free your Finances from Rem-farms
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Rest easy knowing your investments will always be Shariah compliant.
                        Create long-term wealth without sacrificing your faith and values.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-lg font-bold text-gray-800">
                        A 300,000+ Strong Community
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Join a community of over 300,000 people across the world who are
                        leaving Rem-farms behind.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-16 px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">How it works</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        At <span className="font-bold">rem-farms</span>, we make investing
                        simple and accessible for everyone. Whether you're a seasoned
                        investor or just starting, our platform empowers you to take control
                        of your financial future. Follow these four simple steps to get
                        started on your journey.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src="/assets/portfolio-mockup.png"
                            alt="Select your portfolio"
                            className="w-64 md:w-80 shadow-md"
                        />
                    </div>
                    <div className="w-full md:w-1/2 mt-10 md:mt-0 space-y-6">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className={`h-10 w-10 flex justify-center items-center rounded-full ${step.iconColor}`}
                                        ></div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-600">{step.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {activeIndex === index ? (
                                            <span className="text-gray-600 text-xl">-</span>
                                        ) : (
                                            <span className="text-gray-600 text-xl">+</span>
                                        )}
                                    </div>
                                </div>
                                {activeIndex === index && (
                                    <div className="mt-4 text-gray-500">{step.details}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>




            {/* Modal */}
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <PricingPlans />
            </Modal>

            <Footer />
        </>
    );
};

export default Nigeria;
