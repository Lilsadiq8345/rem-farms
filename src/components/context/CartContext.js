import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Create a custom hook to use the cart
export const useCart = () => {
    return useContext(CartContext);
};

// CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
