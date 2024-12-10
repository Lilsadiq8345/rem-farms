import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};

// CartProvider to wrap the application or components that need cart functionality
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add item to cart
    const addToCart = (commodityId, quantity) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex((item) => item.commodityId === commodityId);
            if (existingItemIndex >= 0) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            } else {
                return [...prevCart, { commodityId, quantity }];
            }
        });
    };

    // Get the total quantity of items in the cart
    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Remove an item from the cart
    const removeFromCart = (commodityId) => {
        setCart((prevCart) => prevCart.filter((item) => item.commodityId !== commodityId));
    };

    // Clear the entire cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, getCartCount, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
