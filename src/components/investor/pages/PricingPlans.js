import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion'; // Import motion for animations

const PricingPlans = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleAddToCart = (plan) => {
        const quantity = 1;
        addToCart(plan.commodityId, quantity);
        console.log(`Added ${plan} plan to Cart`);
    };

    const handleBuyNow = (planType) => {
        console.log(`Buying ${planType}`);
        navigate("/investor-register");
    };

    // Pricing plans data
    const pricingPlans = [
        { commodityId: 1, image: "/product.jpeg" },
        { commodityId: 2, image: "/product2.jpeg" },
        { commodityId: 3, image: "/product2.jpeg" },
        { commodityId: 4, image: "/product2.jpeg" },
        { commodityId: 5, image: "/product.jpeg" },
        { commodityId: 6, image: "/product.jpeg" },
    ];

    return (
        <div className="p-6 md:p-8 lg:p-10 bg-gray-50 text-center" id="products">
            <section className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white py-16 rounded-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2
                        className="text-4xl font-extrabold mb-6"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Market Place
                    </motion.h2>
                    <motion.p
                        className="text-lg mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Discover our range of premium products designed for your farming success.
                    </motion.p>

                    {/* Pricing Cards Slider */}
                    <div className="relative">
                        <motion.div
                            className="flex overflow-x-auto space-x-6 px-2 py-4 scrollbar-hide"
                            style={{ scrollSnapType: "x mandatory" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {pricingPlans.map((plan, index) => (
                                <motion.div
                                    key={index}
                                    className="flex-none w-80 md:w-96 text-gray-800 bg-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                                    style={{ scrollSnapAlign: "start" }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.img
                                        src={plan.image}
                                        alt={`Product ${plan.commodityId}`}
                                        className="w-full h-56 object-cover rounded-t-lg"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="p-4 space-y-4">
                                        <motion.button
                                            onClick={() => handleAddToCart(plan)}
                                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-transform duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Add to Cart
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleBuyNow(plan)}
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-transform duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Buy Now
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Navigation Buttons */}
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                            <motion.button
                                className="bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
                                onClick={() => {
                                    document.querySelector('.overflow-x-auto').scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                            <motion.button
                                className="bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
                                onClick={() => {
                                    document.querySelector('.overflow-x-auto').scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPlans;
