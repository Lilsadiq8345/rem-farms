// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/investor/pages/Home';
import InvestorDashboard from './components/investor/pages/InvestorDashboard';
import Login from './components/investor/pages/Login';
import InvestorRegister from './components/investor/pages/InvestorRegister';
import ScrollToTop from './components/investor/ui/ScrollToTop';
import Settings from './components/investor/pages/Settings';
import CommodityList from './components/common/CommodityList';
import Services from './components/common/Services';
import LiveView from './components/common/LiveView';
import Messages from './components/common/Messages';
import Transactions from './components/common/Transactions';
import SavedCalls from './components/common/SavedCalls';
import About from './components/investor/ui/About';
import Faq from './components/investor/ui/Faq';
import ContactSection from './components/investor/ui/ContactSection';
import Products from './components/common/Products';


// Import Staff Components
import StaffDashboard from './components/staff/pages/StaffDashboard';
import StaffLogin from './components/staff/pages/StaffLogin';
import StaffRegister from './components/staff/pages/StaffRegister';

// Import Admin Components
import AdminHomePage from './components/admin/pages/AdminHomePage';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import AdminLogin from './components/admin/pages/AdminLogin';
import AdminRegister from './components/admin/pages/AdminRegister';

const App = () => {
  // Scroll to section function
  const handleNavigation = (sectionId) => {
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Investor Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/investor-login" element={<Login />} />
        <Route path="/investor-register" element={<InvestorRegister />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<ContactSection />} /> {/* Corrected route */}
        <Route path="/products" element={<Products />} />
        <Route path="/commodities" element={<CommodityList />} />
        <Route path="/services" element={<Services />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/live-view" element={<LiveView />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/saved-calls" element={<SavedCalls />} />
        <Route path="/settings" component={Settings} />

        {/* Scrollable Sections */}
        <Route
          path="/home"
          element={<div onLoad={() => handleNavigation('home')}></div>}
        />
        <Route
          path="/about"
          element={<div onLoad={() => handleNavigation('about')}></div>}
        />
        <Route
          path="/contact"
          element={<div onLoad={() => handleNavigation('contact')}></div>}
        />

        {/* Staff Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/staff-register" element={<StaffRegister />} />

        {/* Admin Routes */}
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
