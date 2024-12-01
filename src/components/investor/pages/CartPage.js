import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <section className="bg-green-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-4 text-center">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center text-lg">Your cart is empty.</p>
                ) : (
                    <div className="space-y-6">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-green-700 p-4 rounded-lg">
                                <span>{item.plan}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-6 text-center">
                    <Link to="/checkout" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CartPage;
