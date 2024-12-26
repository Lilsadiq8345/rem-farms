// src/components/DiscoverMore.js
import React from 'react';
import Footer from '../investor/ui/Footer';
import Navbar from '../investor/ui/Navbar';

const DiscoverMore = () => {
  return (
    <div className="mt-12">
      <Navbar />
      {/* Explore Our Market Section */}
      <section className="market-explore my-12 mt-40 mb-40 mx-auto text-center max-w-5xl" id="discover">
        <h2 className="text-4xl font-semibold text-black mb-4">Explore Our Market</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover a wide range of quality products carefully curated to meet your needs. Our marketplace
          offers unmatched variety and value for every shopper.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Product 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img
              src="./product1.jpg"
              alt="Organic Produce"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Organic Produce</h3>
            <p className="text-gray-600 mb-4">
              Fresh, organic, and handpicked products delivered straight from farms to your doorstep.
            </p>
          </div>

          {/* Featured Product 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img
              src="./product2.jpg"
              alt="Dairy Delights"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Dairy Delights</h3>
            <p className="text-gray-600 mb-4">
              Enjoy premium quality dairy products sourced from trusted suppliers for a healthy lifestyle.
            </p>
          </div>

          {/* Featured Product 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-left">
            <img
              src="./product3.jpg"
              alt="Innovative Tools"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">Innovative Tools</h3>
            <p className="text-gray-600 mb-4">
              Equip yourself with cutting-edge tools designed to enhance your farming or gardening experience.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DiscoverMore;
