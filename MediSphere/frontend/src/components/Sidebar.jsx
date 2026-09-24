"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, CalendarCheck, FileText, CreditCard, 
  Bell, User, Settings, Users, Activity
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const context = useAppContext() || {};
  const currentUserRole = context.currentUserRole || 'Patient';

  const getRoleColor = () => {
    switch(currentUserRole) {
      case 'Patient': return '#2563EB';
      case 'Doctor': return '#10B981';
      case 'Admin': return '#8B5CF6';
      default: return '#2563EB';
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['Patient', 'Doctor', 'Admin'] },
    { name: 'Appointments', path: '/appointments', icon: CalendarCheck, roles: ['Patient', 'Doctor'] },
    { name: 'Medical Records', path: '/records', icon: FileText, roles: ['Patient', 'Doctor'] },
    { name: 'Billing', path: '/billing', icon: CreditCard, roles: ['Patient', 'Admin'] },
    { name: 'Patients', path: '/patients', icon: Users, roles: ['Doctor', 'Admin'] },
    { name: 'System Status', path: '/system', icon: Activity, roles: ['Admin'] },
    { name: 'Notifications', path: '/notifications', icon: Bell, roles: ['Patient', 'Doctor', 'Admin'] },
    { name: 'Profile', path: '/profile', icon: User, roles: ['Patient', 'Doctor', 'Admin'] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(currentUserRole));

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        {visibleItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.name} 
              href={item.path} 
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              style={isActive ? { backgroundColor: `${getRoleColor()}15`, color: getRoleColor(), borderRight: `3px solid ${getRoleColor()}` } : {}}
            >
              <item.icon size={20} className="sidebar-icon" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
