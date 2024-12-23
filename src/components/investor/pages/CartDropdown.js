import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDropdown = ({ toggleDropdown }) => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        toggleDropdown(false);
        alert('Please sign in or sign up to continue.');
        navigate('/investor-register');
    };

    return (
        <div className="absolute right-0 bg-white shadow-lg rounded-lg p-4 w-72">
            <h3 className="text-lg font-bold mb-4">Cart</h3>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                        <span>Commodity: {item.commodityId}</span>
                        <span>Qty: {item.quantity}</span>
                        <button
                            onClick={() => removeFromCart(item.commodityId)}
                            className="text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
            <button
                onClick={handleCheckout}
                className="bg-green-500 text-white mt-4 w-full py-2 rounded-lg"
            >
                Checkout
            </button>
        </div>
    );
};

export default CartDropdown;
