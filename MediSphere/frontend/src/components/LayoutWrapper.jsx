"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';
import { useAppContext } from '../context/AppContext';

import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const context = useAppContext() || {};
  const isModalOpen = context.isModalOpen || false;
  const selectedRole = context.selectedRole || 'Patient';
  const closeLoginModal = context.closeLoginModal || (() => {});
  const currentUserRole = context.currentUserRole || 'Patient';

  const isDashboardRoute = pathname?.startsWith('/dashboard') || 
                           pathname?.startsWith('/appointments') || 
                           pathname?.startsWith('/records') || 
                           pathname?.startsWith('/billing') || 
                           pathname?.startsWith('/patients') || 
                           pathname?.startsWith('/system') || 
                           pathname?.startsWith('/notifications') || 
                           pathname?.startsWith('/profile');

  const getRoleColor = () => {
    switch(currentUserRole) {
      case 'Patient': return '#2563EB';
      case 'Doctor': return '#10B981';
      case 'Admin': return '#8B5CF6';
      default: return '#2563EB';
    }
  };

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      {isDashboardRoute && <DashboardNavbar role={currentUserRole || 'Patient'} getRoleColor={getRoleColor} />}
      
      <div style={{ display: 'flex', flex: 1 }}>
        {isDashboardRoute && <Sidebar />}
        <main className="main-content" style={{ width: '100%' }}>
          {children}
        </main>
      </div>

      {!isDashboardRoute && <Footer />}
      {isModalOpen && <LoginModal role={selectedRole} onClose={closeLoginModal} />}
    </>
  );
}
