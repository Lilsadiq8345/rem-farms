import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

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

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ addToCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
