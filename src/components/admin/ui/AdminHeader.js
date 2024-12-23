import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser , FaShoppingCart } from 'react-icons/fa';

const AdminHeader = () => {
  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Rem Farms</h1>
      <nav>
        <Link to="/admin/my-commodities" className="mr-4">My Commodities</Link>
        <Link to="/admin/manage-services" className="mr-4">Manage Services</Link>
        <Link to="/admin/live-viewing" className="mr-4">Live Viewing</Link>
        <Link to="/admin/transactions" className="mr-4">Transactions</Link>
        <Link to="/admin/messages" className="mr-4">Messages</Link>
        <Link to="/profile" className="mr-4"><FaUser  /></Link>
        <Link to="/cart"><FaShoppingCart /></Link>
      </nav>
    </header>
  );
};

export default AdminHeader;