import React, { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const PaymentModal = ({ service, userEmail, userName, onClose, onPaymentSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);  // Show loading while payment is processing
        const paystack = new PaystackPop();

        paystack.newTransaction({
            key: "YOUR_PAYSTACK_PUBLIC_KEY",  // Replace with your actual Paystack public key
            amount: service.price * 100,  // Convert amount to kobo
            email: userEmail,  // Use dynamic email
            name: userName,  // Use dynamic user name
            onSuccess: (transaction) => {
                alert(`Payment successful! Reference: ${transaction.reference}`);
                setLoading(false);
                onPaymentSuccess();
                onClose();
            },
            onCancel: () => {
                alert("Payment was canceled.");
                setLoading(false);
                onClose();
            },
        });
    };

    return (
        <div className="payment-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Confirm Payment</h2>
                <p>Service: {service.name}</p>
                <p>Price: ₦{service.price}</p>
                <p>Purchasing as: {userName} ({userEmail})</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePayment}
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
