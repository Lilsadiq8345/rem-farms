
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../ui/Footer';
import ScrollToTop from '../ui/ScrollToTop';
import Modal from '../ui/Modal';
import Navbar from '../ui/Navbar';
import PricingPlans from '../pages/PricingPlans';
import { motion } from "framer-motion";
import './Home.css';

const Home = ({ setCartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  const handleGetStartedClick = () => setIsModalOpen(true);




  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      < ScrollToTop />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-200 to-blue-100 py-12 hero flex items-center justify-start mt-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto h-auto text-white" id="home">
        <div className="container mx-auto mt-20 px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0">
          {/* Text on the left */}
          <motion.div
            className="lg:w-1/2 md:w-3/4 sm:w-full w-full text-left px-4 sm:px-6 md:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 mb-4 sm:mb-5 md:mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Welcome to Rem-Farms
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
            >
              Empowering agriculture through technology. Join us to invest, grow, and transform farming for the future.
            </motion.p>
            <button
              className="bg-green-800 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-lg"
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
          </motion.div>


        </div>
      </section>

      <motion.div
        className="p-2 rounded-lg text-center sm:px-8 sm:py-4 md:px-8 md:py-8 lg:px-12 lg:py-12 transform -translate-y-10"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <section className="organic-farming-section flex flex-col lg:flex-row items-center max-w-5xl mx-auto my-2 p-2 bg-white rounded-lg shadow-md">
          <div className="flex-1 mb-6 lg:mb-0 lg:mr-6">
            <img
              src="/organic_farmer.jpeg"
              alt="Organic product"
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-serif text-green-700 mb-4">
              Agriculture & Organic Product Farm
            </h2>
            <p className="text-gray-700 text-base mb-4 font-serif">
              There are many variations of passages of ipsum available, but the majority have suffered alteration in some form by injected humor or random words which don’t look even.
            </p>
            <ul className="list-none space-y-2 mb-6">
              <li className="flex items-center text-gray-800 text-base font-Georgia">
                <span className="text-green-600 mr-2">✔️</span> Guaranteed Organic Product
              </li>
              <li className="flex items-center text-gray-800 text-base font-Georgia">
                <span className="text-green-600 mr-2">✔️</span> Intensive subsistence agriculture
              </li>
              <li className="flex items-center text-gray-800 text-base font-Georgia">
                <span className="text-green-600 mr-2">✔️</span> Mediterranean crops are very important
              </li>
            </ul>
          </div>
        </section>
      </motion.div>



      {/* Market Place Section */}
      < motion.div
        className="p-6 md:p-10 lg:p-12 bg-white shadow-md rounded-lg text-center"
        whileHover={{ scale: 1.05 }
        }
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        < section className="bloom-of-the-day my-12 mx-auto text-center max-w-5xl" id="products" >
          <h2 className="text-4xl font-semibold text-black mb-4">Market Place</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            There are many variations of passages of Lorem available but the majority have suffered alteration by
            injected humour or randomised words which don't look even slightly believable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-left">
              <img src="./product.jpeg" alt="Products" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">Best Products</h3>
              <p className="text-gray-600 mb-4">
                There are so many variations of passages more available but the majority have suffered alteration some form.
              </p>
              <Link to="/best-products" className="text-green-500 font-semibold">Discover More</Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-left">
              <img src="./product2.jpeg" alt="Dairy Products" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">Popular Dairy Products</h3>
              <p className="text-gray-600 mb-4">
                There are so many variations of passages more available but the majority have suffered alteration some form.
              </p>
              <Link to="/dairy-products" className="text-green-500 font-semibold">Discover More</Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-left">
              <img src="./product3.jpg" alt="Quality Farming" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold mb-2">High Quality Farming</h3>
              <p className="text-gray-600 mb-4">
                There are so many variations of passages more available but the majority have suffered alteration some form.
              </p>
              <Link to="/quality-farming" className="text-green-500 font-semibold">Discover More</Link>
            </div>
          </div>
        </section >
      </motion.div >

      <PricingPlans />

      {/* Explore Our Projects Section */}
      <motion.div
        className="p-6 md:p-10 lg:p-12 bg-white shadow-md rounded-lg text-center"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        < section className="explore-projects-section my-12 mx-auto text-center max-w-5xl" >
          <h2 className="text-4xl font-semibold text-black mb-4 font-chalkduster">Explore Our Projects</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration by injected humour or randomised words which don't look even slightly believable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Origins Of Agriculture Card */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="./product4.jpeg" alt="Origins of Agriculture" className="w-full h-56 object-cover opacity-75" />
              <Link to="/origins-of-agriculture" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 shadow-ld">
                Origins Of Agriculture
              </Link>
            </div>

            {/* Commercial Tool Grain Card */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="./product5.jpeg" alt="Commercial Tool Grain" className="w-full h-56 object-cover opacity-75" />
              <Link to="./commercial-tool-grain" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 shadow-ld">
                Commercial Tool Grain
              </Link>
            </div>

            {/* Grain Water Farming Card */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="./product6.jpeg" alt="Grain Water Farming" className="w-full h-56 object-cover opacity-75" />
              <Link to="/grain-water-farming" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 shadow-ld">
                Grain Water Farming
              </Link>
            </div>
          </div>
        </section >
      </motion.div>

      {/* Latest Updated News Section */}
      <motion.div
        className="p-6 md:p-8 lg:p-10 bg-white shadow-md rounded-lg text-center"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        < section className="latest-news-section my-12 mx-auto text-center max-w-6xl px-4" >
          <h2 className="text-4xl font-semibold text-black mb-4 font-italic">Latest Updated News</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration by injected humour or randomised words which don't look even slightly believable.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="./images1.jpeg" alt="Luscious Organic Produce" className="w-full h-56 object-cover" />
              <div className="p-4 text-left">
                <p className="text-gray-500 flex items-center mb-2">
                  <span className="mr-2">📅</span> November 06, 2024
                </p>
                <h3 className="text-xl font-semibold text-black mb-2">Luscious Organic Produce</h3>
                <p className="text-gray-600 mb-4">Specialized horticulture Specialized horticulture arose as a result of</p>
                <a href="/read-more-1" className="text-green-600 font-semibold hover:underline">Read More</a>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="./images2.jpeg" alt="Benefits Of Organic Food" className="w-full h-56 object-cover" />
              <div className="p-4 text-left">
                <p className="text-gray-500 flex items-center mb-2">
                  <span className="mr-2">📅</span> May 27, 2024
                </p>
                <h3 className="text-xl font-semibold text-black mb-2">Benefits Of Organic Food</h3>
                <p className="text-gray-600 mb-4">Rudimentary Sedentary Tillage Nomads move with their animals from one place</p>
                <a href="/read-more-2" className="text-green-600 font-semibold hover:underline">Read More</a>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="./images3.jpeg" alt="Buy Only Organic Products" className="w-full h-56 object-cover" />
              <div className="p-4 text-left">
                <p className="text-gray-500 flex items-center mb-2">
                  <span className="mr-2">📅</span> May 07, 2024
                </p>
                <h3 className="text-xl font-semibold text-black mb-2">Buy Only Organic Products</h3>
                <p className="text-gray-600 mb-4">Commercial Plantations It is commonly practiced in regions with European</p>
                <a href="/read-more-3" className="text-green-600 font-semibold hover:underline">Read More</a>
              </div>
            </div>
          </div>
        </section >
      </motion.div>
      <Footer />
    </>
  );
};

export default Home;