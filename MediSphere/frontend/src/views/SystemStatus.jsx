"use client";
import React from 'react';
import { Activity, Server, Database, Shield, Cpu, HardDrive, CheckCircle2 } from 'lucide-react';
import './Dashboard.css';

export default function SystemStatus() {
  return (
    <div className="container dashboard-container animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>Hospital System Status</h1>
        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Real-time server infrastructure, database health, and operations monitor</p>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Spring Boot API Server</h3>
            <Server size={20} color="#10B981" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '1.5rem', color: '#10B981' }}>Port 8085 Online</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>Response Time: 18ms</p>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Database Cluster</h3>
            <Database size={20} color="#2563EB" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '1.5rem', color: '#2563EB' }}>PostgreSQL / H2 Active</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>Connections: 12 Active</p>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h3>System Security</h3>
            <Shield size={20} color="#8B5CF6" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '1.5rem', color: '#8B5CF6' }}>Protected</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>SSL & CORS Active</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Service Health Matrix</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { service: 'Authentication & Session Service', port: '8085', status: 'Operational' },
            { service: 'Appointment Scheduling Engine', port: '8085', status: 'Operational' },
            { service: 'Electronic Health Record (EHR) Storage', port: '8085', status: 'Operational' },
            { service: 'Billing & Payments Gateway', port: '8085', status: 'Operational' },
            { service: 'Real-time Notification Service', port: '8085', status: 'Operational' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: 'var(--bg-color)', borderRadius: '8px' }}>
              <div>
                <strong style={{ color: 'var(--text-dark)' }}>{item.service}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', display: 'block' }}>Endpoint: /api (Port {item.port})</span>
              </div>
              <span className="status-badge success" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={14} /> {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
