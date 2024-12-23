import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './components/context/CartContext'; // Import the CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap App with CartProvider to provide global cart state */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);

// Log web vitals for performance measurement or analytics
reportWebVitals();
