"use client";
import React from 'react';
import Link from 'next/link';
import { Activity, PlusSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Navbar.css';

const Navbar = ({ onLoginClick }) => {
  const { openLoginModal } = useAppContext();
  const handleClick = onLoginClick || (() => openLoginModal('Patient'));

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo">
          <div className="logo-icon-wrapper">
            <PlusSquare size={24} className="logo-cross" />
            <Activity size={24} className="logo-heartbeat" />
          </div>
          <span>HealSync</span>
        </Link>
        <div className="navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <button className="btn-primary" onClick={handleClick}>Login</button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
