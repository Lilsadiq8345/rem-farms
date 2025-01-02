import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // For the close icon
import { Link } from "react-router-dom";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10" id="contact">
        {/* Logo and Contact */}
        <div>
          <img
            src="./REM-FARM.png"
            alt="Rem Farms Logo"
            className="mb-6 h-16 w-auto bg-white p-2 rounded-lg shadow-lg"
          />
          <p className="text-sm mb-2">UK, United Kingdom</p>
          <p className="text-sm mb-2">📞 123-456-7890</p>
          <p className="text-sm mb-4">✉️ info@rem-farms.com</p>
          <div className="flex space-x-4">
            {[
              { icon: faFacebook, link: "https://facebook.com" },
              { icon: faTwitter, link: "https://twitter.com" },
              { icon: faInstagram, link: "https://instagram.com" },
              { icon: faLinkedin, link: "https://linkedin.com" },
            ].map(({ icon, link }, idx) => (
              <a
                key={idx}
                href={link}
                aria-label="Social Media Link"
                className="text-white hover:text-gray-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={icon} size="lg" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/home" },
              { name: "Contact", path: "/contact" },
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "FAQ", path: "/faq" },
            ].map(({ name, path }, idx) => (
              <li key={idx}>
                <Link
                  to={path}
                  className="hover:text-gray-300 cursor-pointer"
                  onClick={handleScrollToTop}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4" id="about">About Us</h4>
          <p className="text-sm mb-4">
            Rem Farms is committed to sustainable agriculture, fostering
            innovation in farming practices, and ensuring a healthy future for
            our planet.
          </p>
          <button
            className="text-green-400 hover:text-green-300"
            onClick={openModal}
          >
            Learn More
          </button>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">
            Subscribe to receive the latest updates, news, and insights.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow p-2 text-black rounded-l-md focus:outline-none"
            />
            <button className="bg-green-500 px-4 py-2 rounded-r-md text-white hover:bg-green-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">About REM Farms</h2>
            <p className="text-gray-700 mb-4">
              At REM Farms, we bridge the gap between technology and agriculture,
              creating opportunities that benefit farmers, investors, and the environment.
            </p>
            <p className="text-gray-700 mb-4">
              We are committed to empowering communities and ensuring a sustainable future through innovation and collaboration.
            </p>
            <p className="text-gray-700 mb-4">
              Our platform connects investors with cutting-edge farming projects,
              offering secure and rewarding investment opportunities.
            </p>
          </div>
        </div>
      )}

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Rem Farms. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
