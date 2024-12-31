import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../ui/Footer';
import About from '../ui/About';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import Navbar from '../ui/Navbar';
import ContactSection from '../ui/ContactSection';
import './Home.css';
import PricingPlans from './PricingPlans';

const Home = ({ setCartItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const closeModal = () => setIsModalOpen(false);
    const handleGetStartedClick = () => setIsModalOpen(true);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 200) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };



    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const steps = [
        {
            title: "Step 1",
            description: "Select your risk tolerance",
            iconColor: "bg-purple-300",
            details:
                "Choosing your risk tolerance is the first step to building your portfolio. Whether you're a conservative investor seeking stability or a risk-taker chasing higher returns, we provide options that suit your comfort level and financial goals.",
        },
        {
            title: "Step 2",
            description: "Set your investment goal",
            iconColor: "bg-orange-300",
            details:
                "Your investment goals define your strategy. Whether you’re saving for retirement, funding your dream home, or just looking to grow wealth, we help you align your goals with a tailored portfolio.",
        },
        {
            title: "Step 3",
            description: "Fund your account",
            iconColor: "bg-teal-300",
            details:
                "Funding your account is quick and secure. Choose from multiple payment options to start your investment journey. Our platform ensures your transactions are encrypted and hassle-free.",
        },
        {
            title: "Step 4",
            description: "We'll take care of the rest",
            iconColor: "bg-yellow-300",
            details:
                "Sit back and relax as we manage your investments. Our team of experts and advanced algorithms work together to monitor the markets, rebalance your portfolio when necessary, and ensure your assets are performing optimally.",
        },
    ];

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <ScrollToTop show={showScrollToTop} /> {/* Pass the state to ScrollToTop */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            <div className="bg-white text-white overflow-x-hidden" id="uk">
                {/* Hero Section */}
                <div className="container mx-auto mt-10 flex flex-col lg:flex-row items-center py-20 px-6 lg:px-20 relative bg-gradient-to-r from-green-700 to-green-900">
                    {/* Text Content */}
                    <motion.div
                        className="lg:w-1/2 text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
                            Revolutionizing Agriculture with <span className="text-yellow-400">Rem-Farms</span>
                        </h1>
                        <p className="text-lg sm:text-xl mb-6 max-w-xl mx-auto lg:mx-0">
                            Empowering farmers and investors through cutting-edge technology for sustainable and profitable growth.
                        </p>
                        <div className="space-x-4">
                            <motion.button
                                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-105"
                                onClick={handleGetStartedClick}
                                whileHover={{ scale: 1.05 }}
                            >
                                Get Started
                            </motion.button>
                            <motion.button
                                className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                            >
                                Learn More
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="lg:w-1/2 mt-10 lg:mt-0" // Adjusted to ensure proper spacing on small screens
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="./phone.png"
                            alt="Farming Illustration"
                            className="w-full max-w-xs mx-auto lg:w-1/2" // Ensuring responsiveness
                        />
                    </motion.div>
                </div>

                {/* How it Works Section */}
                <div className="bg-gray-50 py-16 px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">How it works</h2>
                        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                            At <span className="font-bold">rem-farms</span>, we make investing simple and accessible for everyone. Whether you're a seasoned investor or just starting, our platform empowers you to take control of your financial future. Follow these four simple steps to get started on your journey.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img
                                src="./set.png"
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
                                            <div className={`h-10 w-10 flex justify-center items-center rounded-full ${step.iconColor}`}></div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
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


                {/* Contacts Section  */}
                <ContactSection />
                {/* Pricing Plans Section / Products */}

                <PricingPlans />

                {/* Highlight Section */}
                <section className="bg-white py-20">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Why Choose Us?</h2>
                        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
                            At Rem-Farms, we bring innovation, sustainability, and passion to agriculture. Our mission is to empower farmers
                            and communities with cutting-edge solutions that improve efficiency and productivity.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold text-green-800 mb-4">Innovative Solutions</h3>
                                <p className="text-gray-600">
                                    We deliver advanced farming technology tailored to meet the needs of modern agriculture.
                                </p>
                            </div>
                            <div className="bg-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold text-green-800 mb-4">Sustainability</h3>
                                <p className="text-gray-600">
                                    Our practices prioritize environmental care and the long-term well-being of the planet.
                                </p>
                            </div>
                            <div className="bg-green-100 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold text-green-800 mb-4">Dedicated Support</h3>
                                <p className="text-gray-600">
                                    Our team is always ready to assist, ensuring your farming journey is smooth and successful.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

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

                {/* About Us Section */}
                <About />


                {/* Footer Section */}
                <Footer />
            </div>
        </>
    );
};

export default Home;
