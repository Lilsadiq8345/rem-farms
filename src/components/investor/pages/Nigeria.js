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


            {/* Hero Section */}
            <section
                className="bg-green-50 py-16 lg:py-20 flex items-center justify-center mt-20"
                id="home"
            >
                <motion.div
                    className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    {/* Text on the left */}
                    <div className="lg:w-1/2 w-full text-center lg:text-left mb-10 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold text-green-800 leading-tight mb-6">
                            A Vision to Create a <br />
                            <span className="text-green-600">World Free From Rem-farms</span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            We’re building a world-class financial system that can grow wealth in a
                            way that aligns with your values.
                        </p>
                        <motion.button
                            className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGetStartedClick}
                        >
                            Get Started
                        </motion.button>
                    </div>

                    {/* Image on the right */}

                    <div className="lg:w-1/2 w-full flex justify-center">
                        <div className="relative">
                            <img
                                src="/hero-phone.png" // Replace with the actual image path
                                alt="Financial App"
                                className="w-[250px] sm:w-[300px] md:w-[350px] shadow-xl"
                            />
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-green-100 w-[300px] h-[50px] rounded-full blur-md"></div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
                <div className="bg-white py-16">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-12">
                        <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold text-green-800">Build Real Wealth</h3>
                            <p className="text-gray-700 mt-4">
                                Get access to professional-grade investments. Beat inflation with a
                                diversified portfolio of stocks, gold, and sukuk, managed by
                                investment experts.
                            </p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold text-green-800">
                                Free Your Finances from Rem-farms
                            </h3>
                            <p className="text-gray-700 mt-4">
                                Rest easy knowing your investments will always be Shariah compliant.
                                Create long-term wealth without sacrificing your faith and values.
                            </p>
                        </div>
                        <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
                            <h3 className="text-xl font-bold text-green-800">
                                A 300,000+ Strong Community
                            </h3>
                            <p className="text-gray-700 mt-4">
                                Join a community of over 300,000 people across the world who are
                                leaving Rem-farms behind.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>


            {/* FAQ Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
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
            </motion.div>
            <PricingPlans />


            {/* Modal */}
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <PricingPlans />
            </Modal>

            <Footer />
        </>
    );
};

export default Nigeria;
