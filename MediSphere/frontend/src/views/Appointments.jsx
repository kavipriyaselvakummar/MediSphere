"use client";
import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, Plus, Search, Filter, Clock, User, Stethoscope, 
  CheckCircle, XCircle, AlertCircle, RefreshCw, Trash2, Calendar
} from 'lucide-react';
import { api } from '../services/api';
import './Dashboard.css';

export default function Appointments() {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Form State
  const [newPatient, setNewPatient] = useState('');
  const [newDoctor, setNewDoctor] = useState('Dr. Sarah Jenkins (Cardiology)');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newReason, setNewReason] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await api.getAppointments(searchTerm, statusFilter);
      if (data && Array.isArray(data)) {
        setAppointmentsList(data);
      }
    } catch (e) {
      console.error('Failed to load appointments:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [searchTerm, statusFilter]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validations
    if (!newPatient.trim()) {
      setFormError('Patient name cannot be empty.');
      return;
    }
    if (!newDoctor) {
      setFormError('Please select a doctor.');
      return;
    }
    if (!newDate) {
      setFormError('Please select an appointment date.');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (newDate < today) {
      setFormError('Appointment date cannot be in the past.');
      return;
    }
    if (!newTime) {
      setFormError('Please select a time slot.');
      return;
    }

    const doctorName = newDoctor.split(' (')[0];
    const deptName = newDoctor.includes('(') ? newDoctor.split('(')[1].replace(')', '') : 'General';

    const newAppt = {
      patient: newPatient.trim(),
      doctor: doctorName,
      dept: deptName,
      date: newDate,
      time: newTime,
      status: 'Confirmed',
      reason: newReason.trim() || 'General Consultation'
    };

    try {
      const created = await api.createAppointment(newAppt);
      if (created) {
        setSuccessMessage('Appointment booked successfully and saved to database.');
        fetchAppointments();
        setShowBookingModal(false);
        setNewPatient('');
        setNewDate('');
        setNewTime('');
        setNewReason('');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setFormError('Could not save appointment to backend. Please try again.');
      }
    } catch (e) {
      setFormError('Error connecting to backend server.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateAppointmentStatus(id, newStatus);
      fetchAppointments();
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDateFilter('');
  };

  const filteredAppointments = appointmentsList.filter(app => {
    const matchesSearch = (app.patient || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (app.doctor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (app.dept || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (app.reason || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesDate = !dateFilter || app.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return <span className="status-badge success"><CheckCircle size={14} style={{ display: 'inline', marginRight: 4 }} />Confirmed</span>;
      case 'Pending': return <span className="status-badge warning"><Clock size={14} style={{ display: 'inline', marginRight: 4 }} />Pending</span>;
      case 'Cancelled': return <span className="status-badge error" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}><XCircle size={14} style={{ display: 'inline', marginRight: 4 }} />Cancelled</span>;
      case 'Completed': return <span className="status-badge success" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}><CheckCircle size={14} style={{ display: 'inline', marginRight: 4 }} />Completed</span>;
      default: return <span className="status-badge success">{status}</span>;
    }
  };

  return (
    <div className="container dashboard-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>Appointment Scheduling</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Schedule and manage patient appointments with real-time PostgreSQL synchronization</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={fetchAppointments} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Syncing...' : 'Refresh'}</span>
          </button>
          <button className="btn-primary" onClick={() => setShowBookingModal(true)}>
            <Plus size={18} />
            Book Appointment
          </button>
        </div>
      </div>

      {successMessage && (
        <div style={{ backgroundColor: '#ECFDF5', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #A7F3D0' }}>
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search by patient, doctor, reason..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} style={{ color: 'var(--text-light)' }} />
          <select 
            className="form-input" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto', paddingLeft: '1rem' }}
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} style={{ color: 'var(--text-light)' }} />
          <input 
            type="date" 
            className="form-input" 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ width: 'auto', paddingLeft: '0.75rem' }}
          />
        </div>

        {(searchTerm || statusFilter !== 'All' || dateFilter) && (
          <button className="btn-secondary" onClick={clearFilters} style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Appointment Cards Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
          <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <p>Loading appointments from database...</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-light)' }}>
          <CalendarCheck size={48} style={{ margin: '0 auto 1rem', color: '#94a3b8', display: 'block' }} />
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No appointments found</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>There are no appointments matching your search or filter criteria.</p>
          <button className="btn-primary" onClick={() => setShowBookingModal(true)}>
            <Plus size={16} /> Book New Appointment
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {filteredAppointments.map((app) => (
            <div key={app.id} className="dash-card animate-slide-up">
              <div className="dash-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CalendarCheck size={20} color="var(--primary)" />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-light)' }}>{app.code || `A00${app.id}`}</span>
                </div>
                {getStatusBadge(app.status)}
              </div>
              <div className="dash-card-body">
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <User size={16} color="var(--text-light)" />
                    <strong style={{ fontSize: '1rem', color: 'var(--text-dark)' }}>{app.patient}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Stethoscope size={16} color="var(--text-light)" />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{app.doctor} ({app.dept})</span>
                  </div>
                  {app.reason && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      "{app.reason}"
                    </p>
                  )}
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  <span>Date: <strong>{app.date}</strong></span>
                  <span>Time: <strong>{app.time}</strong></span>
                </div>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  {app.status !== 'Completed' && (
                    <button 
                      onClick={() => handleStatusChange(app.id, 'Completed')} 
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'transparent', cursor: 'pointer' }}
                    >
                      Mark Completed
                    </button>
                  )}
                  {app.status !== 'Cancelled' && (
                    <button 
                      onClick={() => handleStatusChange(app.id, 'Cancelled')} 
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #fee2e2', color: '#ef4444', background: 'transparent', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowBookingModal(false)}>
          <div className="modal-container glass-modal animate-scale-in" onClick={e => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: 'var(--text-dark)' }}>Book New Appointment</h2>
            
            {formError && (
              <div style={{ backgroundColor: '#FEF2F2', color: '#991B1B', padding: '0.5rem 0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleBooking}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Patient Full Name *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Rahul Sharma" 
                  style={{ paddingLeft: '1rem' }}
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)} 
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Doctor / Department *</label>
                <select 
                  className="form-input" 
                  style={{ paddingLeft: '1rem' }}
                  value={newDoctor}
                  onChange={(e) => setNewDoctor(e.target.value)}
                >
                  <option>Dr. Sarah Jenkins (Cardiology)</option>
                  <option>Dr. Michael Chen (Neurology)</option>
                  <option>Dr. Emily White (Orthopedics)</option>
                  <option>Dr. Rajesh Patel (Pediatrics)</option>
                  <option>Dr. Amit Sharma (General Medicine)</option>
                  <option>Dr. Priya Nair (Dermatology)</option>
                  <option>Dr. Vikram Malhotra (Oncology)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Date *</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    style={{ paddingLeft: '1rem' }}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Time Slot *</label>
                  <select 
                    className="form-input" 
                    style={{ paddingLeft: '1rem' }}
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Reason for Visit</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Chest discomfort, Follow-up consultation" 
                  style={{ paddingLeft: '1rem' }}
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowBookingModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
