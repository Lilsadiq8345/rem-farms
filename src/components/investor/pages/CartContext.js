import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);  // Track error state

    // Fetch cart items on load
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/cart');
                const items = response.data.cartItems || [];
                setCartItems(items);
                setCartCount(items.reduce((total, item) => total + (item.quantity || 1), 0));
            } catch (err) {
                console.error('Error fetching cart items:', err.message);
                setError(err.message);  // Set error message
            } finally {
                setLoading(false);  // Set loading to false after fetch
            }
        };
        fetchCartItems();

        return () => {
            // Cleanup function in case component unmounts
        };
    }, []);

    const addToCart = async (commodityId, quantity = 1) => {
        try {
            const response = await axios.post('/api/cart', { commodityId, quantity });
            const updatedCart = response.data.updatedCartItems;
            setCartItems(updatedCart);
            setCartCount(updatedCart.reduce((total, item) => total + (item.quantity || 1), 0));
        } catch (err) {
            console.error('Error adding to cart:', err.message);
            setError(err.message);  // Set error message
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, cartCount, addToCart, loading, error }}>
            {children}
        </CartContext.Provider>
    );
};
