import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './InvestorNavbar.css';

const InvestorNavbar = ({ toggleSidebar }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            {/* Sidebar Toggle Button for Mobile */}
            <button onClick={toggleSidebar} className="text-green-800 md:hidden">
                <FaBars size={24} />
            </button>

            {/* Logo or Brand Name for Larger Screens */}
            <div className="text-2xl font-semibold text-green-800 hidden md:block">
                Investor Dashboard
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 hover:text-green-600"
                >
                    <FaUserCircle size={24} />
                    <span className="hidden sm:block">Profile</span>
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
    );
};

export default InvestorNavbar;
