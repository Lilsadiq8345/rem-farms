// src/components/Commodity.js
import React from 'react';

const Commodity = ({ title, price, setCartItems }) => {
  const addToCart = () => {
    setCartItems((prev) => prev + 1); 
    alert(`${title} added to cart!`);
  };

  return (
    <div className="rounded-lg shadow-lg p-4">
      <img src="https://via.placeholder.com/300x200" alt={title} className="rounded-t-lg w-full" />
      <h4 className="text-lg sm:text-xl font-bold mt-4">{title}</h4>
      <p className="mt-2">{price}</p>
      <button onClick={addToCart} className="mt-4 px-4 py-2 rounded">
        Buy
      </button>
    </div>
  );
};

export default Commodity;
