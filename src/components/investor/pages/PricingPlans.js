import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useCart } from '../../context/CartContext'; // Correct the import path

const PricingPlans = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Access addToCart function from context
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const closeModal = () => {
        setLoginModalOpen(false);
    };

    const handleAddToCart = (plan) => {
        addToCart(plan); // Add plan to cart using the context function
        console.log(`Added ${plan.plan} to Cart`);
    };

    const handleBuyNow = (planType) => {
        console.log(`Buying ${planType}`);
        navigate("/investor-register"); // Redirect to checkout
    };

    return (
        <motion.div
            className="p-6 bg-white shadow-md rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
            <section className="bg-green-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    {/* Section Header */}
                    <h2 className="text-4xl font-bold mb-4">
                        Choose the Best Offered <span className="text-green-300">Plan</span> From Rem-Farms
                    </h2>
                    <p className="text-lg mb-12">
                        Gain unparalleled access to farmland investments, carefully vetted through rigorous due diligence to ensure optimal returns.
                    </p>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { plan: "Basic", price: "$50", profit: "2.5%", duration: "2 Days", roi: "5%", image: "/path-to-basic-image.jpg" },
                            { plan: "Standard", price: "$1,000", profit: "3.5%", duration: "2 Days", roi: "7%", image: "/path-to-standard-image.jpg" },
                            { plan: "Premium", price: "$3,000", profit: "5%", duration: "5 Days", roi: "25%", image: "/path-to-premium-image.jpg" },
                            { plan: "Enterprise", price: "$5,000", profit: "7%", duration: "5 Days", roi: "35%", image: "/path-to-enterprise-image.jpg" },
                            { plan: "Business Plan", price: "$7,000", profit: "8.5%", duration: "10 Days", roi: "85%", image: "/path-to-business-image.jpg" },
                            { plan: "Ultimate", price: "$10,000", profit: "10%", duration: "10 Days", roi: "100%", image: "/path-to-ultimate-image.jpg" },
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className="bg-white text-green-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <img src={plan.image} alt={`${plan.plan} service`} className="w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">{plan.plan}</h3>
                                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                                <ul className="text-left space-y-2 mb-6">
                                    <li>✔️ {plan.profit} Profit</li>
                                    <li>✔️ Return Period: Daily</li>
                                    <li>✔️ Duration: {plan.duration}</li>
                                    <li>✔️ Total ROI: {plan.roi}</li>
                                    <li>✔️ Capital Back</li>
                                </ul>

                                {/* Buttons */}
                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={() => handleAddToCart(plan)} // Pass the plan to add to cart
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(plan.plan)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Modal for Login/Signup */}
                        {isLoginModalOpen && (
                            <Modal isOpen={isLoginModalOpen} onClose={closeModal}>
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-4">Sign In to Continue</h2>
                                    <p className="mb-4">You need to sign in or sign up to proceed to checkout.</p>
                                    <div className="space-x-4">
                                        <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                            Sign In
                                        </Link>
                                        <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default PricingPlans;
