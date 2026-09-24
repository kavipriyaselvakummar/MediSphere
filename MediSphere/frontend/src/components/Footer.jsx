import React from 'react';
import Link from 'next/link';
import { Activity, PlusSquare, Globe, MessageCircle, Share2, Camera } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="footer-logo">
              <div className="logo-icon-wrapper">
                <PlusSquare size={24} className="logo-cross" />
                <Activity size={24} className="logo-heartbeat" />
              </div>
              <span>HealSync</span>
            </Link>
            <p className="footer-desc">
              A modern healthcare management platform connecting patients, doctors, and administrators through one intelligent system.
            </p>
          </div>
          
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Legal</h3>
            <ul>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">Cookie Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3>Contact Information</h3>
            <p>123 Health Ave, Medical City</p>
            <p>support@healsync.com</p>
            <p>+91 (800) 123-4567</p>
            <div className="social-links">
              <Link href="#"><Globe size={20} /></Link>
              <Link href="#"><MessageCircle size={20} /></Link>
              <Link href="#"><Share2 size={20} /></Link>
              <Link href="#"><Camera size={20} /></Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 HealSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
