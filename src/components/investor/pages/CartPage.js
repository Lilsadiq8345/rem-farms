import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Correct import for CartContext
import axios from 'axios';

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, setCartItems, cartCount } = useCart(); // Access cart items and cart count
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Fetch the cart items from the backend
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data.cartItems);
                calculateTotalPrice(response.data.cartItems); // Calculate total price
            } catch (err) {
                console.error('Error fetching cart items', err);
            }
        };

        fetchCartItems();
    }, [setCartItems]);

    // Calculate total price of all items in the cart
    const calculateTotalPrice = (items) => {
        let total = 0;
        items.forEach(item => {
            total += item.commodityPrice * item.quantity;
        });
        setTotalPrice(total);
    };

    const handleProceedToPayment = () => {
        // Navigate to the payment page
        navigate('/payment');
    };

    const handleRemoveItem = async (cartId) => {
        try {
            // Remove the item from the backend and update the cart state
            await axios.delete(`/api/cart/${cartId}`);
            setCartItems(cartItems.filter(item => item.cartId !== cartId)); // Remove item from state
        } catch (err) {
            console.error('Error removing item from cart', err);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty. Start adding some commodities!</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map(item => (
                        <div key={item.cartId} className="flex justify-between items-center p-4 border rounded-lg">
                            <div className="flex items-center">
                                <img src={item.commodityImage} alt={item.commodityName} className="w-16 h-16 mr-4" />
                                <div>
                                    <h3 className="font-semibold">{item.commodityName}</h3>
                                    <p>${item.commodityPrice} x {item.quantity}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveItem(item.cartId)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="mt-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Total: ${totalPrice}</h2>
                        <button
                            onClick={handleProceedToPayment}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
