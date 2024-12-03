import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // Fetch cart items on load
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart');
                setCartItems(response.data.cartItems);
                setCartCount(response.data.cartItems.length);
            } catch (err) {
                console.error('Error fetching cart items', err);
            }
        };
        fetchCartItems();
    }, []);

    const addToCart = async (commodityId, quantity) => {
        try {
            await axios.post('/api/cart', { commodityId, quantity });
            setCartCount(prevCount => prevCount + 1); // Update cart count
        } catch (err) {
            console.error('Error adding to cart', err);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, cartCount, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
