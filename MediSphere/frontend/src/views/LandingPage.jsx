"use client";
import React, { useEffect, useState } from 'react';
import { 
  User, Stethoscope, Shield, 
  CalendarCheck, FileText, Video, CreditCard, Pill, BarChart3,
  Users, Building
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './LandingPage.css';

const StatCard = ({ icon: Icon, endValue, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = endValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endValue]);

  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper">
        <Icon size={24} className="stat-icon" />
      </div>
      <h3 className="stat-value">{count.toLocaleString()}+</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon-wrapper">
      <Icon size={24} className="feature-icon" />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{description}</p>
  </div>
);

const LandingPage = ({ onOpenModal }) => {
  const { openLoginModal } = useAppContext();
  const handleOpenModal = onOpenModal || openLoginModal;

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-particles"></div>
        <div className="container hero-container animate-fade-in">
          <div className="hero-content">
            <h2 className="hero-subtitle">Welcome to HealSync</h2>
            <h1 className="hero-title">Smart Healthcare.<br/>Seamless Care.<br/>Better Lives.</h1>
            <p className="hero-desc">
              A modern healthcare management platform connecting patients, doctors, and administrators through one intelligent system.
            </p>
          </div>
          
          <div className="portal-cards">
            <div className="portal-card glass" onClick={() => handleOpenModal('Patient')}>
              <div className="portal-icon patient-icon"><User size={32} /></div>
              <h3>Patient Portal</h3>
              <p>Book appointments, access prescriptions, and view medical records.</p>
            </div>
            
            <div className="portal-card glass" onClick={() => handleOpenModal('Doctor')}>
              <div className="portal-icon doctor-icon"><Stethoscope size={32} /></div>
              <h3>Doctor Portal</h3>
              <p>Manage schedules, patient records, and consultations.</p>
            </div>
            
            <div className="portal-card glass" onClick={() => handleOpenModal('Admin')}>
              <div className="portal-icon admin-icon"><Shield size={32} /></div>
              <h3>Admin Portal</h3>
              <p>Monitor hospital operations, staff, and system analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="stats-section">
        <div className="container">
          <div className="stats-grid animate-slide-up">
            <StatCard icon={Stethoscope} endValue={450} label="Doctors Available" />
            <StatCard icon={Users} endValue={12500} label="Patients Registered" />
            <CalendarCheck size={24} className="hidden-icon" />
            <StatCard icon={CalendarCheck} endValue={850} label="Appointments Today" />
            <StatCard icon={Building} endValue={24} label="Departments" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Comprehensive Features</h2>
            <p>Everything you need to manage healthcare efficiently in one platform.</p>
          </div>
          
          <div className="features-grid">
            <FeatureCard 
              icon={CalendarCheck} 
              title="Appointment Scheduling" 
              description="Easy and seamless appointment booking for patients and intelligent schedule management for doctors."
            />
            <FeatureCard 
              icon={FileText} 
              title="Electronic Medical Records" 
              description="Secure, centralized access to patient medical histories, lab results, and prescriptions."
            />
            <FeatureCard 
              icon={Video} 
              title="Online Consultation" 
              description="Integrated video calling for remote check-ups and telehealth appointments."
            />
            <FeatureCard 
              icon={CreditCard} 
              title="Billing & Payments" 
              description="Transparent billing system with support for insurance claims and online payment processing."
            />
            <FeatureCard 
              icon={Pill} 
              title="Pharmacy Management" 
              description="Track medication inventory, process e-prescriptions, and manage supplier orders."
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Reports & Analytics" 
              description="Advanced analytics dashboard for hospital administrators to track performance metrics."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
