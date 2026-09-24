"use client";
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { mockProfile } from '../data/mockData';
import { api } from '../services/api';
import './Dashboard.css';

export default function Profile() {
  const context = useAppContext() || {};
  const currentUser = context.currentUser;
  const setCurrentUser = context.setCurrentUser || (() => {});
  const currentUserRole = context.currentUserRole;
  const role = currentUserRole || 'Patient';
  const initialData = mockProfile[role] || mockProfile['Patient'];

  const [formData, setFormData] = useState(initialData);
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const email = currentUser?.email || (role === 'Patient' ? 'patient@medisphere.com' : role === 'Doctor' ? 'dr.jenkins@medisphere.com' : 'admin@medisphere.com');
      const dbProfile = await api.getProfileByEmail(email);
      if (dbProfile) {
        setFormData({
          name: dbProfile.name || initialData.name,
          email: dbProfile.email || initialData.email,
          phone: dbProfile.phone || initialData.phone,
          address: dbProfile.address || initialData.address,
          bloodGroup: dbProfile.bloodGroup || initialData.bloodGroup,
          specialty: dbProfile.specialty || initialData.specialty,
          department: dbProfile.department || initialData.department
        });
      }
    };
    fetchProfile();
  }, [currentUser?.email, role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const savedUser = await api.updateProfile({ ...formData, role });
      if (savedUser) {
        setCurrentUser(savedUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(savedUser));
        }
      } else {
        const fallbackUser = { ...currentUser, ...formData };
        setCurrentUser(fallbackUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(fallbackUser));
        }
      }
    } catch (err) {
      console.log('Profile update local fallback');
      const fallbackUser = { ...currentUser, ...formData };
      setCurrentUser(fallbackUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(fallbackUser));
      }
    }
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="container dashboard-container animate-fade-in" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>Account Profile</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Manage your account credentials and personal information</p>
      </div>

      <div className="card" style={{ padding: '2rem' }}>
        {/* Avatar Upload UI */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '96px', height: '96px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
            {formData.name ? formData.name.charAt(0) : 'U'}
            <label style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '50%', padding: '0.4rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
              <Camera size={16} color="var(--text-dark)" />
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={() => alert('Avatar upload UI triggered!')} />
            </label>
          </div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-dark)' }}>{formData.name}</h3>
          <span className="status-badge success" style={{ marginTop: '0.25rem' }}>{role} Account</span>
        </div>

        {savedMessage && (
          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 500 }}>
            Profile settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Full Name</label>
            <div className="input-container">
              <div className="input-icon"><User size={18} /></div>
              <input 
                type="text" 
                name="name" 
                className="form-input" 
                value={formData.name || ''} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Email Address</label>
              <div className="input-container">
                <div className="input-icon"><Mail size={18} /></div>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  value={formData.email || ''} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Phone Number</label>
              <div className="input-container">
                <div className="input-icon"><Phone size={18} /></div>
                <input 
                  type="tel" 
                  name="phone" 
                  className="form-input" 
                  value={formData.phone || ''} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Address</label>
            <div className="input-container">
              <div className="input-icon"><MapPin size={18} /></div>
              <input 
                type="text" 
                name="address" 
                className="form-input" 
                value={formData.address || ''} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
