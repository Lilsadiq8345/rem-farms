import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                // Update the API URL to include the full backend URL
                const response = await axios.get('https://rem-farms.onrender.com/api/services');

                // Use the 'services' field from the response
                setServices(response.data.services);
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
            // Post request to add the selected service to the cart
            await axios.post('https://rem-farms.onrender.com/api/cart', {
                commodityId: service.id,  // Make sure this matches the backend requirement
                quantity: 1, // Assuming adding 1 to the cart; you can adjust this
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT for authentication
                },
            });
            alert('Service added to cart successfully!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Error adding to cart. Please try again.');
        }
    };

    const handleBuyNow = async (service) => {
        try {
            // Initiate a payment for the service
            const response = await axios.post('https://rem-farms.onrender.com/api/checkout', {
                serviceId: service.id,  // Service ID should be sent
                amount: service.price,  // Assuming service.price holds the amount
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Send JWT for authentication
                },
            });

            // Redirect user to the payment URL
            window.location.href = response.data.authorization_url;
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Error during checkout. Please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Services</h2>
            {loading ? (
                <p>Loading services...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.length === 0 ? (
                        <p>No services available.</p>
                    ) : (
                        services.map((service) => (
                            <div key={service.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                <img
                                    src={service.image_url || '/fallback-image.png'}  // Use the correct field from the database
                                    alt={service.name}
                                    className="w-full h-32 object-cover rounded"
                                />
                                <h3 className="text-lg font-semibold mt-4">{service.name}</h3>
                                <p>{service.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="font-semibold">₦{service.price.toFixed(2)}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAddToCart(service)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleBuyNow(service)}
                                            className="bg-green-600 text-white px-4 py-2 rounded"
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
