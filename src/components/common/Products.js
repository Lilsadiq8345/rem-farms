// src/components/Products.js
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../investor/ui/Footer';
import Navbar from '../investor/ui/Navbar';

const Products = () => {
  return (

    <div className="mt-12">
      < Navbar />
      {/* Bloom of the Day Section */}
      <section className="bloom-of-the-day my-12 mt-40 mb-40 mx-auto text-center max-w-5xl" id="products">
        <h2 className="text-4xl font-semibold text-black mb-4">Market Place</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          There are many variations of passages of Lorem available, but the majority have suffered
          alteration by injected humour or randomised words that don't look even slightly believable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img src="./product.jpeg" alt="Products" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Best Products</h3>
            <p className="text-gray-600 mb-4">
              There are so many variations of passages available, but the majority have suffered some form of alteration.
            </p>
            <Link to="/best-products" className="text-green-500 font-semibold">
              Discover More
            </Link>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img src="./product2.jpeg" alt="Dairy Products" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Popular Dairy Products</h3>
            <p className="text-gray-600 mb-4">
              There are many variations of passages available, but most have suffered alteration in some form.
            </p>
            <Link to="/dairy-products" className="text-green-500 font-semibold">
              Discover More
            </Link>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img src="./product3.jpg" alt="Quality Farming" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">High Quality Farming</h3>
            <p className="text-gray-600 mb-4">
              There are many variations of passages available, but most have suffered some alteration.
            </p>
            <Link to="/quality-farming" className="text-green-500 font-semibold">
              Discover More
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
