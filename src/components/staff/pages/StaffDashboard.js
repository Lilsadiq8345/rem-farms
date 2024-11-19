// src/components/StaffDashboard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaHome,
  FaLeaf,
  FaTasks,
  FaUserCircle,
  FaShoppingCart,
  FaUserFriends,
  FaEnvelope,
  FaCog,
} from 'react-icons/fa';

const StaffDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Navbar dropdown state

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle Navbar Dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'
          } bg-green-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="py-6 px-4 flex items-center justify-between">
          <img src="/REM-FARM-LOGO.png" alt="Rem Farms" className="h-10 w-10 bg-white shadow-ld rounded" />
          {isSidebarOpen && (
            <h1 className="text-xl font-bold">Staff Dashboard</h1>
          )}
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 px-2 space-y-2">
          <Link
            to="/overview"
            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded"
          >
            <FaHome size={20} />
            {isSidebarOpen && <span>Overview</span>}
          </Link>

          <Link
            to="/my-commodities"
            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded"
          >
            <FaLeaf size={20} />
            {isSidebarOpen && <span>My Commodities</span>}
          </Link>

          <Link
            to="/services"
            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded"
          >
            <FaTasks size={20} />
            {isSidebarOpen && <span>Services</span>}
          </Link>

          <Link
            to="/sell-commodity"
            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded"
          >
            <FaShoppingCart size={20} />
            {isSidebarOpen && <span>Sell Commodity</span>}
          </Link>

          <Link
            to="/investor-requests"
            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded"
          >
            <FaUserFriends size={20} />
            {isSidebarOpen && <span>Investor Requests</span>}
          </Link>

          <Link
            to="/messages"
            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded"
          >
            <FaEnvelope size={20} />
            {isSidebarOpen && <span>Messages</span>}
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-4 p-2 hover:bg-green-700 rounded"
          >
            <FaCog size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-green-800">
            <FaBars size={24} />
          </button>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:text-green-600"
            >
              <FaUserCircle size={24} />
              <span>Profile</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
                <li className="border-b">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100">
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Overview"
              description="Summary of your recent activities and commodity stats."
              link="/overview"
              icon={<FaHome size={40} />}
            />
            <DashboardCard
              title="My Commodities"
              description="Manage and track your commodities."
              link="/my-commodities"
              icon={<FaLeaf size={40} />}
            />
            <DashboardCard
              title="Services"
              description="Access various staff services available on the platform."
              link="/services"
              icon={<FaTasks size={40} />}
            />
            <DashboardCard
              title="Sell Commodity"
              description="List your commodities for sale."
              link="/sell-commodity"
              icon={<FaShoppingCart size={40} />}
            />
            <DashboardCard
              title="Investor Requests"
              description="Manage requests from investors."
              link="/investor-requests"
              icon={<FaUserFriends size={40} />}
            />
            <DashboardCard
              title="Messages"
              description="View messages from investors and admin."
              link="/messages"
              icon={<FaEnvelope size={40} />}
            />
            <DashboardCard
              title="Settings"
              description="Update your profile and preferences."
              link="/settings"
              icon={<FaCog size={40} />}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

// Reusable Dashboard Card Component
const DashboardCard = ({ title, description, link, icon }) => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <div className="flex items-center gap-4">
      {icon}
      <div>
        <h2 className="text-xl font-bold text-green-800">{title}</h2>
        <p className="mt-2">{description}</p>
        <Link to={link} className="text-green-600 mt-4 block">
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default StaffDashboard;
