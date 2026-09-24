"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Activity, PlusSquare, LogOut, Bell, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './DashboardNavbar.css';

const DashboardNavbar = ({ role, getRoleColor }) => {
  const router = useRouter();
  const context = useAppContext() || {};
  const currentUser = context.currentUser;
  const logout = context.logout || (() => {});

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="dashboard-navbar" style={{ borderBottomColor: `${getRoleColor()}40` }}>
      <div className="container dashboard-navbar-container">
        <Link href="/dashboard" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <PlusSquare size={24} className="logo-cross" />
            <Activity size={24} className="logo-heartbeat" />
          </div>
          <span style={{ color: getRoleColor() }}>HealSync</span>
        </Link>
        
        <div className="dashboard-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search appointments, records, billing..." 
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                const query = e.target.value.toLowerCase();
                if (query.includes('bill') || query.includes('pay') || query.includes('invoice')) {
                  router.push('/billing');
                } else if (query.includes('rec') || query.includes('lab') || query.includes('report') || query.includes('test')) {
                  router.push('/records');
                } else if (query.includes('patient')) {
                  router.push('/patients');
                } else if (query.includes('prof') || query.includes('user') || query.includes('account')) {
                  router.push('/profile');
                } else {
                  router.push(`/appointments?search=${encodeURIComponent(query)}`);
                }
              }
            }}
          />
        </div>

        <div className="dashboard-actions">
          <button className="icon-btn" onClick={() => router.push('/notifications')} title="View Notifications">
            <Bell size={20} />
            <span className="badge" style={{ backgroundColor: getRoleColor() }}>3</span>
          </button>
          
          <div className="user-profile">
            <div className="avatar" style={{ backgroundColor: getRoleColor() }} suppressHydrationWarning>
              {currentUser?.name ? currentUser.name.charAt(0) : role.charAt(0)}
            </div>
            <div className="user-info">
              <span className="user-name" suppressHydrationWarning>{currentUser?.name || 'Demo User'}</span>
              <span className="user-role" style={{ color: getRoleColor() }} suppressHydrationWarning>{role}</span>
            </div>
          </div>
          
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default DashboardNavbar;
