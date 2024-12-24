import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop'; // Assuming you have a ScrollToTop component
import Modal from '../ui/Modal';
import Navbar from '../ui/Navbar';
import PricingPlans from '../pages/PricingPlans';

const Uk = ({ setCartItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false); // Added state

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

    return (
        <>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <ScrollToTop show={showScrollToTop} /> {/* Pass the state to ScrollToTop */}
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white overflow-x-hidden" id="uk">
                {/* Hero Section */}
                <div className="container mx-auto mt-10 flex flex-col lg:flex-row items-center py-20 px-6 lg:px-20">
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

                {/* Features Section */}
                <div className="bg-white text-gray-800 py-20">
                    <div className="container mx-auto text-center px-6 lg:px-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">Why Choose Rem-Farms?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                            {[
                                { title: 'Sustainable Practices', icon: '🌱', description: 'We focus on eco-friendly and sustainable farming solutions.' },
                                { title: 'Effortless Investments', icon: '💼', description: 'Simplifying investment opportunities for all types of investors.' },
                                { title: 'Global Community', icon: '🌍', description: 'Connecting farmers and investors from all corners of the globe.' },
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="p-8 bg-gray-100 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="text-5xl mb-4 text-green-700">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Our Vision Section */}
                <section className="py-16 bg-gray-50 text-green-600">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center px-6">
                        {/* Left Column */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-green-800">Sustainable Agriculture Practices</h2>
                            <p className="mb-6 text-black">Promoting environmentally-friendly farming methods for long-term ecological balance.</p>
                            <ul className="space-y-4 text-black">
                                {[
                                    { title: 'Expert Investment Team', description: 'Our team ensures your investments are in capable hands.' },
                                    { title: 'Disciplined Investment Philosophy', description: 'We adhere to sustainable and profitable ventures.' },
                                    { title: 'Proprietary Sourcing Technology', description: 'Utilizing advanced technology for exclusive opportunities.' },
                                    { title: 'Crop Rotation and Diversity', description: 'We implement practices to boost crop yields sustainably.' },
                                ].map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className=" text-black p-2 rounded-full mr-4">✔</span>
                                        <div>
                                            <h4 className="font-semibold">{point.title}</h4>
                                            <p className="text-sm">{point.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Column with Image */}
                        <div className="flex justify-center">
                            <img
                                src="/hero4.jpeg"
                                alt="Agriculture"
                                className="rounded-md shadow-lg w-80 h-80 object-cover"
                            />
                        </div>
                    </div>
                </section>


                {/* Pricing Plans Section */}
                <PricingPlans />

                {/* Testimonial Section */}
                <div className="bg-gray-100 py-20">
                    <div className="container mx-auto text-center px-6 lg:px-20">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-10">What Our Users Say</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[
                                { name: 'John Doe', feedback: 'Rem-Farms helped me double my yields!', location: 'California, USA' },
                                { name: 'Jane Smith', feedback: 'Investing in Rem-Farms was the best decision I made.', location: 'London, UK' },
                                { name: 'Ahmed Ali', feedback: 'A platform that truly cares about farmers.', location: 'Lagos, Nigeria' },
                            ].map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <p className="italic text-gray-700">"{testimonial.feedback}"</p>
                                    <p className="font-bold mt-4 text-gray-800">- {testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <Footer />
            </div>
        </>
    );
};

export default Uk;
