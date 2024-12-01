import React from 'react';

const CheckoutPage = () => {
    return (
        <section className="bg-green-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-4 text-center">Checkout</h2>
                <p className="text-center text-lg mb-6">Review your cart and proceed with payment.</p>
                {/* Add form or payment gateway integration here */}
            </div>
        </section>
    );
};

export default CheckoutPage;
