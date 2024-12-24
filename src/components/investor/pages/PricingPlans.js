import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext'; // Correct the import path for CartContext

const PricingPlans = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Access the addToCart function from the context

    const handleAddToCart = (plan) => {
        const quantity = 1; // Set the default quantity to 1
        addToCart(plan.commodityId, quantity); // Add to cart using the context function
        console.log(`Added ${plan} plan to Cart`);
    };

    const handleBuyNow = (planType) => {
        console.log(`Buying ${planType}`);
        navigate("/investor-register"); // Redirect to registration or checkout page
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
        <motion.div
            className="p-6 md:p-8 lg:p-10 shadow-md rounded-lg text-center"
            whileHover={{ scale: 1.02 }} // Smaller hover scale effect
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} // Smaller duration for subtle animation
        >
            <section className="bg-green-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.h2
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Choose the Best Offered <span className="text-green-300">From Rem-Farms</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Gain unparalleled access to farmland investments, carefully vetted through rigorous due diligence to ensure optimal returns.
                    </motion.p>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                className=" text-green-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 * index }} // Delayed animation for each card
                            >
                                <motion.img
                                    src={plan.image}
                                    alt={`${plan} plan`}
                                    className="w-16 h-16 mx-auto mb-4"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                />

                                <div className="flex flex-col space-y-4">
                                    <motion.button
                                        onClick={() => handleAddToCart(plan)} // Pass the plan to add to cart
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
                                        whileHover={{ scale: 1.03 }} // Subtle hover effect
                                    >
                                        Add to Cart
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleBuyNow(plan)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
                                        whileHover={{ scale: 1.03 }} // Subtle hover effect
                                    >
                                        Buy Now
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default PricingPlans;
