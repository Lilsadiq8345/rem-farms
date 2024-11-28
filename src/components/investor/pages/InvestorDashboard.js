import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaChartLine, FaVideo, FaFileAlt, FaComments,
  FaHistory, FaDownload, FaBars, FaBell, FaShoppingCart,
  FaUserCircle, FaTimes
} from "react-icons/fa";
import axios from "axios";
import CommodityList from './CommodityList';
import Services from './Services';
import LiveView from './LiveView';
import Transactions from './Transactions';
import SavedCalls from './SavedCalls';
import Messages from './Messages';
import Footer from '../ui/Footer';

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('home');
  const [notificationCount, setNotificationCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isCartPanelOpen, setIsCartPanelOpen] = useState(false);

  const userId = 1; // Get the logged-in user's ID (from session/localStorage)

  useEffect(() => {
    // Fetch cart and notification data
    axios.get(`https://rem-farms.onrender.com/api/cart/count/${userId}`).then((response) => {
      setCartCount(response.data);
    });

    axios.get(`https://rem-farms.onrender.com/api/notifications/count/${userId}`).then((response) => {
      setNotificationCount(response.data);
    });

    // Fetch detailed notifications and cart items
    axios.get(`https://rem-farms.onrender.com/api/notifications/${userId}`).then((response) => {
      setNotifications(response.data);
    });

    axios.get(`https://rem-farms.onrender.com/api/cart/${userId}`).then((response) => {
      setCartItems(response.data);
    });
  }, [userId]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const toggleNotificationPanel = () => {
    setIsNotificationPanelOpen(!isNotificationPanelOpen);
    setIsCartPanelOpen(false); // Close cart panel if open
  };

  const toggleCartPanel = () => {
    setIsCartPanelOpen(!isCartPanelOpen);
    setIsNotificationPanelOpen(false); // Close notification panel if open
  };

  const clearNotifications = () => {
    setNotifications([]); // Clear all notifications
    setNotificationCount(0); // Reset notification count
  };

  const clearCartItems = () => {
    setCartItems([]); // Clear all cart items
    setCartCount(0); // Reset cart count
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300 flex flex-col`}>
          <div className="py-4 px-2 flex items-center justify-between">
            <img src="/REM-FARM.png" alt="Rem Farms" className="h-10 w-10 bg-white shadow-lg rounded" />
            {isSidebarOpen && <h1 className="text-xl font-bold hidden md:block">Investor Dashboard</h1>}
          </div>

          <nav className="flex-1 px-2 space-y-2">
            <SidebarItem to="#" icon={<FaHome />} text="Home" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("home")} />
            <SidebarItem to="#" icon={<FaChartLine />} text="My Commodities" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("commodities")} />
            <SidebarItem to="#" icon={<FaFileAlt />} text="Services" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("services")} />
            {isSidebarOpen && (
              <SidebarItem to="#" icon={<FaVideo />} text="Live View" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("live-view")} />
            )}
            <SidebarItem to="#" icon={<FaComments />} text="Messages" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("messages")} />
            <SidebarItem to="#" icon={<FaHistory />} text="Transaction History" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("transactions")} />
            <SidebarItem to="#" icon={<FaDownload />} text="Saved Live Calls" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("saved-calls")} />
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <button onClick={toggleSidebar} className="text-green-800">
              <FaBars size={24} />
            </button>

            <div className="flex items-center gap-6">
              {/* Notification Icon */}
              <div className="relative">
                <button onClick={toggleNotificationPanel} className="text-green-800">
                  <FaBell size={24} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Cart Icon */}
              <div className="relative">
                <button onClick={toggleCartPanel} className="text-green-800">
                  <FaShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                      {cartCount}
                    </span>
                  )}
                </button>
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
                <DashboardCard title="Your Investment Overview" description="View your investment performance" link="#" icon={<FaChartLine />} />
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
                <LiveView />
              </div>
            )}

            {selectedSection === 'services' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Services</h2>
                <Services />
              </div>
            )}

            {selectedSection === 'messages' && (
              <div className="p-6 bg-white rounded-lg shadow-md">
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
      {/* Footer */}
      <Footer />
      {/* Notification Panel */}
      {isNotificationPanelOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-80 h-80 bg-white shadow-lg z-50">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button onClick={toggleNotificationPanel}>
              <FaTimes />
            </button>
          </div>
          <div className="p-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="p-2 border-b">{notification.message}</div>
              ))
            ) : (
              <p>No notifications available</p>
            )}
          </div>
          <button
            onClick={clearNotifications}
            className="w-full py-2 bg-red-600 text-white hover:bg-red-700"
          >
            Clear All Notifications
          </button>
        </div>
      )}

      {/* Cart Panel */}
      {isCartPanelOpen && (
        <div className="fixed top-0 right-0 bottom-0 w-80 h-80 bg-white shadow-lg z-50">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold">Cart</h2>
            <button onClick={toggleCartPanel}>
              <FaTimes />
            </button>
          </div>
          <div className="p-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="p-2 border-b">{item.name}</div>
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          <button
            onClick={clearCartItems}
            className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

// Reusable SidebarItem component
const SidebarItem = ({ to, icon, text, isSidebarOpen, onClick }) => (
  <Link to={to} onClick={onClick} className="flex items-center p-2 hover:bg-green-700 rounded">
    {icon}
    {isSidebarOpen && <span className="ml-2">{text}</span>}
  </Link>
);

// Reusable DashboardCard component
const DashboardCard = ({ title, description, link, icon }) => (
  <div className="flex items-center p-4 border rounded-lg shadow hover:shadow-md transition">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <Link to={link} className="text-green-700 underline">View more</Link>
    </div>
  </div>
);

export default InvestorDashboard;
