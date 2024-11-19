import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaChartLine, FaVideo, FaFileAlt, FaComments,
  FaHistory, FaDownload, FaBars, FaBell, FaShoppingCart,
  FaUserCircle
} from "react-icons/fa";
import CommodityList from '../../common/CommodityList';
import Services from '../../common/Services';
import LiveView from '../../common/LiveView';
import Transactions from '../../common/Transactions';
import SavedCalls from '../../common/SavedCalls';
import Messages from '../../common/Messages';
import Footer from '../ui/Footer';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('home');
  const [notificationCount, setNotificationCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Example logic for notification and cart count
    setNotificationCount(3); // Example count of notifications
    setCartCount(5); // Example count of items in the cart
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Logout function to clear session data and redirect to homepage
  const handleLogout = () => {
    // Clear session data or token here (e.g., localStorage or sessionStorage)
    localStorage.removeItem('userToken');  // Example for removing token from localStorage

    // Redirect to homepage
    navigate('/');
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300 flex flex-col`}>
          <div className="py-4 px-2 flex items-center justify-between">
            <img src="/REM-FARM-LOGO.png" alt="Rem Farms" className="h-10 w-10 bg-white shadow-ld rounded" />
            {isSidebarOpen && <h1 className="text-xl font-bold hidden md:block">Investor Dashboard</h1>}
          </div>

          <nav className="flex-1 px-2 space-y-2">
            <SidebarItem to="#" icon={<FaHome />} text="Home" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("home")} />
            <SidebarItem to="#" icon={<FaChartLine />} text="My Commodities" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("commodities")} />
            <SidebarItem to="#" icon={<FaFileAlt />} text="Services" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("services")} />
            <div>
              {isSidebarOpen && (
                <>
                  <SidebarItem to="#" icon={<FaVideo />} text="Live View" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("live-view")} />
                </>
              )}
            </div>
            <SidebarItem to="#" icon={<FaComments />} text="Messages" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("messages")} />
            <SidebarItem to="#" icon={<FaHistory />} text="Transaction History" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("transactions")} />
            <SidebarItem to="#" icon={<FaDownload />} text="Saved Live Calls" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("saved-calls")} />
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col ">
          {/* Top Navbar */}
          <header className="bg-white shadow p-4 flex justify-between items-center ">
            <button onClick={toggleSidebar} className="text-green-800">
              <FaBars size={24} />
            </button>

            <div className="flex items-center gap-6">
              {/* Notification Icon */}
              <div className="relative">
                <FaBell size={24} className="text-green-800 cursor-pointer" />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {notificationCount}
                  </span>
                )}
              </div>

              {/* Cart Icon */}
              <div className="relative">
                <FaShoppingCart size={24} className="text-green-800 cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center gap-2 hover:text-green-600">
                  <FaUserCircle size={24} />
                  <span>Profile</span>
                </button>

                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
                    <li className="border-b">
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                        Settings & Privacy
                      </Link>
                    </li>
                    <li>
                      <Link to="/help" className="block px-4 py-2 hover:bg-gray-100">
                        Help & Support
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-4 overflow-y-auto">
            {selectedSection === 'home' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Welcome to your Dashboard</h2>
                <DashboardCard />
              </div>
            )}

            {selectedSection === 'commodities' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">My Commodities</h2>
                <CommodityList />
              </div>
            )}

            {selectedSection === 'live-view' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Live View</h2>
                <p>Watch the latest live sessions related to your investments.</p>
                <LiveView />
              </div>
            )}

            {selectedSection === 'services' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Services</h2>
                <p>Explore the various services we offer to enhance your investment journey.</p>
                <Services />
              </div>
            )}

            {selectedSection === 'messages' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Messages</h2>
                <p>Check your inbox for messages from other investors or our support team.</p>
                <Messages />
              </div>
            )}

            {selectedSection === 'transactions' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Transaction History</h2>
                <Transactions />
              </div>
            )}

            {selectedSection === 'saved-calls' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Saved Live Calls</h2>
                <SavedCalls />
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Reusable Sidebar Item Component
const SidebarItem = ({ to, icon, text, isSidebarOpen, onClick }) => (
  <Link to={to} className="flex items-center gap-4 p-2 hover:bg-gray-700 text-white" onClick={onClick}>
    <span className="text-xl">{icon}</span>
    {isSidebarOpen && <span>{text}</span>}
  </Link>
);

// Reusable Dashboard Card Component
const DashboardCard = ({ title, description, link, icon }) => (
  <Link to={link} className="p-4 bg-white shadow rounded hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="text-2xl text-green-600">{icon}</div>
    </div>
  </Link>
);

export default InvestorDashboard;
