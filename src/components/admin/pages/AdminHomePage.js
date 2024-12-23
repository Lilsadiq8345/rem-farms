import React from 'react';
import Navbar from '../ui/AdminNavbar';
import AdminScrollToTop from '../ui/AdminScrollToTop';
import { Link } from 'react-router-dom';

const AdminHomepage = () => {
  return (
    <>
      <AdminScrollToTop />
      <Navbar />

      <div className="container mx-auto p-4">
        {/* Header with Logo */}
        <header className="flex flex-col items-center justify-center py-6">
          <img src='/REM-FARM-LOGO.png' alt="REM Farms Logo" className="w-24 h-24 mb-4" />
          <h1 className="text-4xl font-bold text-green-800">Welcome to REM Farms Admin Dashboard</h1>
        </header>

        {/* Hero Banner */}
        <section className="hero-banner flex flex-col items-center justify-center text-center mt-6 px-4 py-6 bg-green-800 text-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Manage Your Commodities with Ease</h2>
          <p className="text-lg mb-8">List, track, and grow your agricultural commodities on our platform.</p>
          <Link to="/commodities" className="bg-green-600 px-6 py-3 rounded hover:bg-green-700">Manage My Commodities</Link>
        </section>

        {/* Featured Commodities */}
        <section className="mt-12 max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-green-800">Featured Commodities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Example Commodity */}
            <div className="bg-green-800 shadow-lg rounded-lg p-6 text-white">
              <img src="/path/to/commodity1.jpg" alt="Commodity 1" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h4 className="text-xl font-bold">Commodity Name</h4>
              <p>Market Value: $500</p>
              <Link to="/commodity-details" className="text-white font-bold mt-2 block">View Details</Link>
            </div>
          </div>
        </section>

        {/* Admin Testimonials */}
        <section className="bg-green-800 shadow-lg rounded-lg py-16 mt-12 text-white">
          <h3 className="text-3xl font-bold text-center">What Farmers Say</h3>
          <div className="max-w-5xl mx-auto text-center mt-8">
            <blockquote className="italic text-xl">"REM Farms has made managing my livestock much easier!"</blockquote>
            <p className="font-bold">- Farmer John</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-12 max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-green-800">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold">Step 1: List Commodities</h4>
              <p>Upload details of your commodities to our platform.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold">Step 2: Manage Services</h4>
              <p>Subscribe to services like housing and veterinary care.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold">Step 3: Connect with Investors</h4>
              <p>Engage with investors through our secure platform.</p>
            </div>
          </div>
        </section>

        {/* Available Services */}
        <section className="bg-green-100 py-16 mt-12">
          <h3 className="text-3xl font-bold text-green-800 text-center">Available Services</h3>
          <div className="max-w-5xl mx-auto text-center mt-8">
            <p>Explore our range of services tailored to farmers.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h4 className="text-xl font-bold">Housing Services</h4>
                <p>$50 per month</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h4 className="text-xl font-bold">Veterinary Care</h4>
                <p>$75 per visit</p>
              </div>
            </div>
          </div>
        </section>

        {/* News/Blog */}
        <section className="mt-12 max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-green-800">Latest News & Blog</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <article className="bg-white shadow-lg rounded-lg p-6">
              <h4 className="text-xl font-bold">Farming Tips</h4>
              <p>Learn how to maximize your crop yield.</p>
            </article>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-green-800 text-white text-center py-6 mt-12">
          <p>&copy; 2024 REM Farms. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default AdminHomepage;
