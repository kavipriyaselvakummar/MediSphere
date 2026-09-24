"use client";
import React, { useState, useEffect } from 'react';
import { Bell, Calendar, FileText, DollarSign, Check, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import './Dashboard.css';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await api.getNotifications();
      if (data && Array.isArray(data)) {
        setNotifications(data);
      }
    } catch (e) {
      console.error('Failed to load notifications:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      await api.markNotificationsRead();
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (e) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'appointment': return <Calendar size={20} color="#2563EB" />;
      case 'result': return <FileText size={20} color="#10B981" />;
      case 'billing': return <DollarSign size={20} color="#f59e0b" />;
      default: return <Bell size={20} color="var(--primary)" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container dashboard-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>Notification Center</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
            Stay updated with clinical reminders, appointments, and billing alerts ({unreadCount} unread)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={fetchNotifications} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Sync</span>
          </button>
          <button className="btn-secondary" onClick={markAllRead} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check size={16} /> Mark all as read
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
          <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <p>Loading notification alerts...</p>
        </div>
      ) : (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>
              <Bell size={40} style={{ margin: '0 auto 1rem', color: '#94a3b8', display: 'block' }} />
              <p>No notifications at this time.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id} 
                style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  padding: '1.25rem 1.5rem', 
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: n.read ? 'white' : 'rgba(37, 99, 235, 0.04)',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ 
                  padding: '0.75rem', 
                  borderRadius: '50%', 
                  backgroundColor: n.read ? 'var(--bg-color)' : 'rgba(37, 99, 235, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getIcon(n.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-dark)' }}>{n.title}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{n.time || 'Today'}</span>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0 }}>{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
