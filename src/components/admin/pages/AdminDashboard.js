// src/components/admin/AdminDashboard.js
import React, { useState } from 'react';
import {
  FaBars,
  FaUser,
  FaHome,
  FaCogs,
  FaChartLine,
  FaBox,
  FaDollarSign,
  FaVideo,
  FaCommentDots,
  FaUserCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Custom styles for layout

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Navbar dropdown state
  const [activeMenu, setActiveMenu] = useState('home'); // Active menu tracking

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle Navbar Dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-green-800 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="py-6 px-4 flex items-center justify-between">
          <img src="/REM-FARM-LOGO.png" alt="Rem Farms" className="h-10 w-10" />
          {isSidebarOpen && <h1 className="text-xl font-bold">Admin Dashboard</h1>}
        </div>

        <nav className="flex-1 px-2 space-y-2">
          <SidebarItem
            to="/admin"
            icon={<FaHome size={20} />}
            text="Home"
            isActive={activeMenu === 'home'}
            onClick={() => setActiveMenu('home')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/users"
            icon={<FaUser size={20} />}
            text="Users Management"
            isActive={activeMenu === 'users'}
            onClick={() => setActiveMenu('users')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/commodities"
            icon={<FaBox size={20} />}
            text="Commodities"
            isActive={activeMenu === 'commodities'}
            onClick={() => setActiveMenu('commodities')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/services"
            icon={<FaCogs size={20} />}
            text="Services"
            isActive={activeMenu === 'services'}
            onClick={() => setActiveMenu('services')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/transactions"
            icon={<FaDollarSign size={20} />}
            text="Transactions"
            isActive={activeMenu === 'transactions'}
            onClick={() => setActiveMenu('transactions')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/live-sessions"
            icon={<FaVideo size={20} />}
            text="Live Sessions"
            isActive={activeMenu === 'live-sessions'}
            onClick={() => setActiveMenu('live-sessions')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/reports"
            icon={<FaChartLine size={20} />}
            text="Reports & Analytics"
            isActive={activeMenu === 'reports'}
            onClick={() => setActiveMenu('reports')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/customer-service"
            icon={<FaCommentDots size={20} />}
            text="Customer Service"
            isActive={activeMenu === 'customer-service'}
            onClick={() => setActiveMenu('customer-service')}
            isSidebarOpen={isSidebarOpen}
          />
          <SidebarItem
            to="/admin/settings"
            icon={<FaCogs size={20} />}
            text="Settings"
            isActive={activeMenu === 'settings'}
            onClick={() => setActiveMenu('settings')}
            isSidebarOpen={isSidebarOpen}
          />
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
              <span>Admin</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
                <li className="border-b">
                  <Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
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

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent(activeMenu)}
        </main>
      </div>
    </div>
  );
};

// Reusable Sidebar Item Component
const SidebarItem = ({ to, icon, text, isActive, onClick, isSidebarOpen }) => (
  <div
    className={`flex items-center gap-4 p-2 cursor-pointer hover:bg-green-700 rounded ${
      isActive ? 'bg-green-700' : ''
    }`}
    onClick={onClick}
  >
    {icon}
    {isSidebarOpen && <Link to={to}>{text}</Link>}
  </div>
);

// Render Content Based on Active Menu
const renderContent = (menu) => {
  switch (menu) {
    case 'home':
      return (
        <div>
          <h2>Dashboard Overview</h2>
          <p>Welcome to the Admin Dashboard. Here you can manage all aspects of the platform.</p>
        </div>
      );
    case 'users':
      return (
        <div>
          <h2>Users Management</h2>
          <p>Manage farmers and investors. Approve registrations, manage disputes, and send bulk notifications.</p>
        </div>
      );
    case 'commodities':
      return (
        <div>
          <h2>Commodities Management</h2>
          <p>Manage and review commodities listed on the platform.</p>
        </div>
      );
    // Add other cases for the remaining menus
    default:
      return <div>Select a menu to get started.</div>;
  }
};

export default AdminDashboard;
