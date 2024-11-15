import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                // Replace with your actual API endpoint
                const response = await axios.get('/api/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleAddToCart = (service) => {
        console.log('Adding to cart:', service);
        // Handle add to cart logic here
    };

    const handleBuyNow = (service) => {
        console.log('Buying now:', service);
        // Handle buy now logic here
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
                                    src={service.imageUrl || '/fallback-image.png'}
                                    alt={service.name}
                                    className="w-full h-32 object-cover rounded"
                                />
                                <h3 className="text-lg font-semibold mt-4">{service.name}</h3>
                                <p>{service.description}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="font-semibold">{service.price}</span>
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
