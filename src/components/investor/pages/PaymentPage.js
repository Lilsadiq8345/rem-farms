import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    const handlePayment = () => {
        if (paymentMethod === '') {
            alert('Please select a payment method.');
            return;
        }

        // Simulate a successful payment
        console.log('Payment successful with method:', paymentMethod);
        alert('Payment successful!');

        // Redirect to a confirmation or order page after payment
        navigate('/confirmation');
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Payment Page</h1>
            <div className="space-y-4">
                <label className="block font-semibold">Select Payment Method</label>
                <div className="flex gap-4">
                    <button
                        onClick={() => setPaymentMethod('Credit Card')}
                        className={`py-2 px-4 border rounded-lg ${paymentMethod === 'Credit Card' ? 'bg-green-500 text-white' : ''}`}
                    >
                        Credit Card
                    </button>
                    <button
                        onClick={() => setPaymentMethod('PayPal')}
                        className={`py-2 px-4 border rounded-lg ${paymentMethod === 'PayPal' ? 'bg-green-500 text-white' : ''}`}
                    >
                        PayPal
                    </button>
                </div>

                <button
                    onClick={handlePayment}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg mt-6"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
