import React, { useState } from 'react';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import Navbar from '../ui/Navbar';
import './Home.css';

const Nigeria = ({ setCartItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const closeModal = () => setIsModalOpen(false);
    const handleGetStartedClick = () => setIsModalOpen(true);

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
            <ScrollToTop />
            <Modal isOpen={isModalOpen} onClose={closeModal} />
            <Navbar />

            {/* Hero Section */}
            <section className="bg-green-50 py-16 lg:py-20 flex items-center justify-center mt-20" id="nigeria">
                <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-12">
                    {/* Text on the left */}
                    <div className="lg:w-1/2 w-full text-center lg:text-left mb-10 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold text-green-800 leading-tight mb-6">
                            A Vision to Create a <br />
                            <span className="text-green-600">World Free From Rem-farms</span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            We’re building a world-class financial system that can grow wealth in a way that aligns with your values.
                        </p>
                        <button
                            className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg"
                            onClick={handleGetStartedClick}
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Image on the right */}
                    <div className="lg:w-1/2 w-full flex justify-center">
                        <div className="relative">
                            <img
                                src="/REM-FARM.png" // Replace with the actual image path
                                alt="rem farm"
                                className="w-[250px] sm:w-[300px] md:w-[350px] shadow-xl"
                            />
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-green-100 w-[300px] h-[50px] rounded-full blur-md"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-12">
                    <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold text-green-800">Build Real Wealth</h3>
                        <p className="text-gray-700 mt-4">
                            Get access to professional-grade investments. Beat inflation with a diversified portfolio of stocks, gold, and sukuk, managed by investment experts.
                        </p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold text-green-800">Free Your Finances from Rem-farms</h3>
                        <p className="text-gray-700 mt-4">
                            Rest easy knowing your investments will always be Shariah compliant. Create long-term wealth without sacrificing your faith and values.
                        </p>
                    </div>
                    <div className="bg-green-50 p-8 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-bold text-green-800">A 300,000+ Strong Community</h3>
                        <p className="text-gray-700 mt-4">
                            Join a community of over 300,000 people across the world who are leaving Rem-farms behind.
                        </p>
                    </div>
                </div>
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

            {/* Footer Section */}
            <Footer />
        </>
    );
};

export default Nigeria;
