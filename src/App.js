import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/investor/pages/Home';
import Nigeria from './components/investor/pages/Nigeria';
import Uk from './components/investor/pages/Uk';
import InvestorDashboard from './components/investor/pages/InvestorDashboard';
import InvestorLogin from './components/investor/pages/InvestorLogin';
import InvestorRegister from './components/investor/pages/InvestorRegister';
import PricingPlans from "./components/investor/pages/PricingPlans";
import ScrollToTop from './components/investor/ui/ScrollToTop';
import Settings from './components/investor/pages/Settings';
import CommodityList from './components/investor/pages/CommodityList';
import Services from './components/investor/pages/Services';
import LiveView from './components/investor/pages/LiveView';
import Messages from './components/investor/pages/Messages';
import CartDropdown from './components/investor/pages/CartDropdown';
import Transactions from './components/investor/pages/Transactions';
import SavedCalls from './components/investor/pages/SavedCalls';
import About from './components/investor/ui/About';
import Faq from './components/investor/ui/Faq';
import ContactSection from './components/investor/ui/ContactSection';
import DiscoverMore from './components/common/DiscoverMore';

// Import Staff Components
import StaffDashboard from './components/staff/pages/StaffDashboard';
import StaffLogin from './components/staff/pages/StaffLogin';
import StaffRegister from './components/staff/pages/StaffRegister';

// Import Admin Components
import AdminHomePage from './components/admin/pages/AdminHomePage';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import AdminLogin from './components/admin/pages/AdminLogin';
import AdminRegister from './components/admin/pages/AdminRegister';

// Scroll utility function
const userType = localStorage.getItem('userType'); // Determine user type dynamically ('investor' or 'staff')

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

// Scroll handler component
const ScrollHandler = ({ sectionId }) => {
  React.useEffect(() => {
    if (sectionId) {
      scrollToSection(sectionId);
    }
  }, [sectionId]);

  return null;
};

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      <Routes>
        {/* Investor Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nigeria" element={<Nigeria />} />
        <Route path="/uk" element={<Uk />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/investor-login" element={<InvestorLogin />} />
        <Route path="/investor-register" element={<InvestorRegister />} />
        <Route path="/" element={<PricingPlans />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/cart" element={<CartDropdown />} />
        <Route path="/discover-more" element={<DiscoverMore />} />
        <Route path="/commodities" element={<CommodityList />} />
        <Route path="/services" element={<Services />} />
        <Route path="/messages" render={() => <Messages userType={userType} />} />
        <Route path="/live-view" element={<LiveView />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/saved-calls" element={<SavedCalls />} />
        <Route path="/settings" element={<Settings />} />

        {/* Scrollable Sections */}
        <Route
          path="/home"
          element={
            <>
              <Home />
              <ScrollHandler sectionId="home" />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <About />
              <ScrollHandler sectionId="about" />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <ContactSection />
              <ScrollHandler sectionId="contact" />
            </>
          }
        />

        {/* Staff Routes */}
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
