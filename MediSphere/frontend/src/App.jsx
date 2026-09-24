import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LoginModal from './components/LoginModal';

const AppLayout = ({ onOpenModal }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar onLoginClick={() => onOpenModal('Patient')} />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage onOpenModal={onOpenModal} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Patient');

  const openLoginModal = (role = 'Patient') => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <AppLayout onOpenModal={openLoginModal} />
      {isModalOpen && <LoginModal role={selectedRole} onClose={closeLoginModal} />}
    </Router>
  );
}

export default App;
