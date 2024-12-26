import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="p-6 md:p-8 lg:p-10 rounded-lg text-center" id="products">
            <section className="bg-green-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Market Place
                    </h2>
                    <h2 className="text-4xl font-bold mb-4">
                        Choose the Best Offered <span className="text-green-300">From Rem-Farms</span>
                    </h2>
                    <p className="text-lg mb-12">
                        Explore our diverse range of premium products that cater to all your farming needs
                    </p>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className="text-green-800 p-6 rounded-lg shadow-lg transition-shadow duration-300 transform hover:scale-105 hover:shadow-xl hover:translate-y-2"
                            >
                                <img
                                    src={plan.image}
                                    alt={`${plan} plan`}
                                    className="w-30 h-30 mx-auto mb-4 transition-all duration-300 transform hover:scale-110"
                                />

                                <div className="flex flex-col space-y-4">
                                    <button
                                        onClick={() => handleAddToCart(plan)} // Pass the plan to add to cart
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:translate-x-2"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(plan)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:translate-x-2"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PricingPlans;
