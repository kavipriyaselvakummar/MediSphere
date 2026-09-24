"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultContext = {
  isModalOpen: false,
  selectedRole: 'Patient',
  currentUserRole: 'Patient',
  openLoginModal: () => {},
  closeLoginModal: () => {},
  login: () => {},
  logout: () => {},
  currentUser: { name: 'Demo User', role: 'Patient', email: 'patient@medisphere.com' },
  setCurrentUser: () => {}
};

const AppContext = createContext(defaultContext);

export const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Patient');
  const [currentUserRole, setCurrentUserRole] = useState('Patient');
  const [currentUser, setCurrentUser] = useState({ name: 'Demo User', role: 'Patient', email: 'patient@medisphere.com' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCurrentUser(parsed);
          if (parsed.role) setCurrentUserRole(parsed.role);
        } catch (e) {}
      }
    }
  }, []);

  const openLoginModal = (role = 'Patient') => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsModalOpen(false);
  };
  
  const login = (role, userDetails = null) => {
    setCurrentUserRole(role);
    let userObj = userDetails;
    if (!userObj) {
      userObj = {
        name: role === 'Patient' ? 'Demo Patient' : role === 'Doctor' ? 'Dr. Sarah Jenkins' : 'System Admin',
        role: role,
        email: role === 'Patient' ? 'patient@medisphere.com' : role === 'Doctor' ? 'dr.jenkins@medisphere.com' : 'admin@medisphere.com'
      };
    }
    setCurrentUser(userObj);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(userObj));
    }
  };

  const logout = () => {
    setCurrentUser({ name: 'Demo User', role: 'Patient', email: 'patient@medisphere.com' });
    setCurrentUserRole('Patient');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  };

  return (
    <AppContext.Provider value={{ isModalOpen, selectedRole, openLoginModal, closeLoginModal, currentUserRole, login, logout, currentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext) || defaultContext;
