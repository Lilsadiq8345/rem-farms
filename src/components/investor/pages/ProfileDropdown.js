import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ profileImageUrl }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                    src={profileImageUrl || "/default-profile.jpg"} // Fallback to default image
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Settings
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
