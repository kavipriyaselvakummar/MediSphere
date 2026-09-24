"use client";
import React, { useState } from 'react';
import { Users, Search, UserCheck, Activity, Phone, Mail, FileText, Plus } from 'lucide-react';
import './Dashboard.css';

const mockPatientsList = [
  { id: 'P1001', name: 'John Doe', age: 38, gender: 'Male', bloodGroup: 'O+', phone: '+1 (555) 123-4567', email: 'john.doe@email.com', condition: 'Hypertension', doctor: 'Dr. Sarah Jenkins', status: 'Active' },
  { id: 'P1002', name: 'Alice Smith', age: 29, gender: 'Female', bloodGroup: 'A+', phone: '+1 (555) 234-5678', email: 'alice.smith@email.com', condition: 'Migraine', doctor: 'Dr. Michael Chen', status: 'Active' },
  { id: 'P1003', name: 'Robert Brown', age: 52, gender: 'Male', bloodGroup: 'B-', phone: '+1 (555) 345-6789', email: 'robert.brown@email.com', condition: 'Post-Surgery Recovery', doctor: 'Dr. Emily White', status: 'Under Observation' },
  { id: 'P1004', name: 'Emma Wilson', age: 44, gender: 'Female', bloodGroup: 'AB+', phone: '+1 (555) 456-7890', email: 'emma.wilson@email.com', condition: 'Routine Checkup', doctor: 'Dr. Sarah Jenkins', status: 'Discharged' },
  { id: 'P1005', name: 'Rajesh Kumar', age: 34, gender: 'Male', bloodGroup: 'O+', phone: '+91 98765 43210', email: 'rajesh.k@email.com', condition: 'Pediatric Care', doctor: 'Dr. Rajesh Patel', status: 'Active' },
];

export default function Patients() {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState(mockPatientsList);

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.condition.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container dashboard-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>Patient Directory & Records</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Manage registered patients, medical histories, and treatment statuses</p>
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search patients by name, ID, or condition..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-dark)' }}>
          Registered Patients ({filtered.length})
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-light)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem 1.5rem' }}>Patient ID</th>
                <th style={{ padding: '1rem 1.5rem' }}>Full Name</th>
                <th style={{ padding: '1rem 1.5rem' }}>Age / Gender</th>
                <th style={{ padding: '1rem 1.5rem' }}>Condition</th>
                <th style={{ padding: '1rem 1.5rem' }}>Primary Doctor</th>
                <th style={{ padding: '1rem 1.5rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-dark)' }}>{p.id}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-light)' }}>{p.age} yrs ({p.gender})</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-dark)' }}>{p.condition}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-light)' }}>{p.doctor}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`status-badge ${p.status === 'Active' ? 'success' : 'warning'}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
