import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useCart } from '../../context/CartContext'; // Correct the import path

const PricingPlans = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Access addToCart function from context

    const handleAddToCart = (plan) => {
        addToCart(plan); // Add plan to cart using the context function
        console.log(`Added ${plan.price} plan to Cart`);
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
                        Choose the Best Offered <span className="text-green-300">From Rem-Farms</span>
                    </h2>
                    <p className="text-lg mb-12">
                        Gain unparalleled access to farmland investments, carefully vetted through rigorous due diligence to ensure optimal returns.
                    </p>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { price: "$50", image: "/product.jpeg" },
                            { price: "$1,000", image: "/product2.jpeg" },
                            { price: "$3,000", image: "/product2.jpeg" },
                            { price: "$5,000", image: "/product2.jpeg" },
                            { price: "$7,000", image: "/product.jpeg" },
                            { price: "$10,000", image: "/product.jpeg" },
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className="bg-white text-green-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <img src={plan.image} alt={`${plan.price} plan`} className="w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">{plan.price}</h3>

                                {/* Buttons */}
                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={() => handleAddToCart(plan)} // Pass the plan to add to cart
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(plan.price)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default PricingPlans;
