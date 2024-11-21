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
                commodityId: service.SERVICE_ID,  // Use SERVICE_ID from schema
                quantity: 1, // Assuming adding 1 to the cart; you can adjust this
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send JWT for authentication
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
                serviceId: service.SERVICE_ID,  // Use SERVICE_ID from schema
                amount: service.PRICE,  // Ensure that service.PRICE holds the correct amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send JWT for authentication
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
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Services</h2>
            {loading ? (
                <p className="text-center text-lg">Loading services...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.length === 0 ? (
                        <p className="text-center text-lg">No services available.</p>
                    ) : (
                        services.map((service) => (
                            <div key={service.SERVICE_ID} className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
                                <img
                                    src={`/images/${service.IMAGE_URL || 'default-image.jpg'}`}  // Fallback to default image
                                    alt={service.NAME}
                                    className="w-full h-48 object-cover rounded"
                                />
                                <h3 className="text-lg font-semibold mt-4 text-center">{service.NAME}</h3>
                                <p className="text-sm text-gray-600 text-center mt-2">{service.DESCRIPTION}</p>
                                <div className="flex justify-between items-center w-full mt-4">
                                    <span className="font-semibold text-lg">
                                        ₦{typeof service.PRICE === 'number' ? service.PRICE.toFixed(2) : 'Invalid price'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(service)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-full md:w-auto"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleBuyNow(service)}
                                            className="bg-green-600 text-white px-4 py-2 rounded text-sm w-full md:w-auto"
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
