import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                // Ensure backend API endpoint is correct
                const response = await axios.get('https://rem-farms.onrender.com/api/services');

                // Check if the response structure is valid
                if (response.data && Array.isArray(response.data.services)) {
                    setServices(response.data.services);
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleAddToCart = async (service) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to add items to the cart.');
                return;
            }

            // Post request to add the selected service to the cart
            await axios.post('https://rem-farms.onrender.com/api/cart', {
                commodityId: service.SERVICE_ID,
                quantity: 1,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Service added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert(`Error adding to cart: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleBuyNow = async (service) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to proceed with the purchase.');
                return;
            }

            // Initiate a payment for the service
            const response = await axios.post('https://rem-farms.onrender.com/api/checkout', {
                serviceId: service.SERVICE_ID,
                amount: service.PRICE,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Redirect user to the payment URL
            window.location.href = response.data.authorization_url;
        } catch (error) {
            console.error('Error during checkout:', error);
            alert(`Error during checkout: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Services</h2>
            {loading ? (
                <p className="text-center text-lg">Loading services...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {services.length === 0 ? (
                        <p className="text-center text-lg col-span-full">No services available.</p>
                    ) : (
                        services.map((service) => (
                            <div key={service.SERVICE_ID} className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
                                <img
                                    src={service.IMAGE_URL ? `/images/${service.IMAGE_URL}` : '/images/default-image.jpg'}
                                    alt={service.NAME}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                                <h3 className="text-lg font-semibold text-center mb-2">{service.NAME}</h3>
                                <p className="text-sm text-gray-600 text-center mb-4">{service.DESCRIPTION}</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
                                    <span className="font-semibold text-lg mb-2 sm:mb-0">
                                        ₦{!isNaN(Number(service.PRICE)) ? Number(service.PRICE).toFixed(2) : 'Invalid price'}
                                    </span>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={() => handleAddToCart(service)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm flex-1 sm:flex-none"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleBuyNow(service)}
                                            className="bg-green-600 text-white px-4 py-2 rounded text-sm flex-1 sm:flex-none"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Services;
