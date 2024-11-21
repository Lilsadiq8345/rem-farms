import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome, FaChartLine, FaVideo, FaFileAlt, FaComments,
  FaHistory, FaDownload, FaBars, FaBell, FaShoppingCart,
  FaUserCircle
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

  const userId = 1; // Get the logged-in user's ID (from session/localStorage)

  useEffect(() => {
    // Fetch cart count
    axios.get(`/api/cart/count/${userId}`).then((response) => {
      setCartCount(response.data);  // Set the cart count from the database
    });

    // Fetch notifications count
    axios.get(`/api/notifications/count/${userId}`).then((response) => {
      setNotificationCount(response.data);  // Set the notification count from the database
    });

    // Fetch notifications
    axios.get(`/api/notifications/${userId}`).then((response) => {
      setNotifications(response.data);  // Set the notifications data from the database
    });

    // Fetch cart items
    axios.get(`/api/cart/${userId}`).then((response) => {
      setCartItems(response.data);  // Set the cart items from the database
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
            {isSidebarOpen && (
              <>
                <SidebarItem to="#" icon={<FaVideo />} text="Live View" isSidebarOpen={isSidebarOpen} onClick={() => setSelectedSection("live-view")} />
              </>
            )}
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
                <h2 className="text-2xl font-semibold">Messages</h2>
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

// SidebarItem Component
const SidebarItem = ({ to, icon, text, onClick, isSidebarOpen }) => (
  <Link to={to} onClick={onClick} className="flex items-center gap-4 text-white p-2 rounded-md hover:bg-green-700">
    {icon}
    {isSidebarOpen && <span>{text}</span>}
  </Link>
);

// DashboardCard Component
const DashboardCard = ({ title, description, link, icon }) => (
  <div className="p-4 bg-green-100 rounded-lg shadow-md">
    <div className="flex gap-4 items-center">
      {icon}
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
    <Link to={link} className="text-green-700 hover:underline mt-4 inline-block">Go to {title}</Link>
  </div>
);

export default InvestorDashboard;
