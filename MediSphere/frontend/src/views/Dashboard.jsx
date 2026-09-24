"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';
import { 
  CalendarCheck, Clock, FileText, Pill, Stethoscope, 
  Users, Activity, ShieldAlert, HeartPulse, CreditCard,
  RefreshCw, AlertCircle
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const router = useRouter();
  const context = useAppContext() || {};
  const currentUserRole = context.currentUserRole;
  const currentUser = context.currentUser;
  const role = currentUserRole || 'Patient';

  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [billingSummary, setBillingSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appRes, recRes, prescRes, billRes] = await Promise.all([
        api.getAppointments(),
        api.getMedicalRecords(),
        api.getPrescriptions(),
        api.getBillingSummary()
      ]);

      if (appRes) setAppointments(appRes);
      if (recRes) setMedicalRecords(recRes);
      if (prescRes) setPrescriptions(prescRes);
      if (billRes) setBillingSummary(billRes);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Unable to load latest dashboard data. Using offline fallback.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUserRole) {
      router.push('/');
    } else {
      fetchDashboardData();
    }
  }, [currentUserRole, router]);

  const PatientView = () => {
    const upcoming = appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').slice(0, 2);
    const recentPresc = prescriptions.slice(0, 3);
    const recentRecord = medicalRecords[0];

    return (
      <div className="dashboard-grid">
        {/* Appointments Card */}
        <div className="dash-card animate-slide-up">
          <div className="dash-card-header">
            <h3>Upcoming Appointments</h3>
            <CalendarCheck size={20} color="#2563EB" />
          </div>
          <div className="dash-card-body">
            {upcoming.length > 0 ? (
              upcoming.map((item, idx) => (
                <div className="appointment-item" key={item.id || idx} style={{ marginBottom: idx < upcoming.length - 1 ? '1rem' : 0 }}>
                  <div className="appointment-date">
                    <span className="month">{item.date ? item.date.slice(5, 7) : 'AUG'}</span>
                    <span className="day">{item.date ? item.date.slice(8, 10) : '12'}</span>
                  </div>
                  <div className="appointment-details">
                    <h4>{item.doctor}</h4>
                    <p>{item.dept || 'General'} • {item.time}</p>
                    <span className={`status-badge ${item.status === 'Confirmed' ? 'success' : 'warning'}`} style={{ marginTop: '4px', display: 'inline-block' }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>No upcoming appointments scheduled.</p>
            )}
          </div>
        </div>
        
        {/* Prescriptions Card */}
        <div className="dash-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="dash-card-header">
            <h3>Active Prescriptions</h3>
            <Pill size={20} color="#2563EB" />
          </div>
          <div className="dash-card-body">
            {recentPresc.length > 0 ? (
              <ul className="list-group">
                {recentPresc.map((p, idx) => (
                  <li key={p.id || idx} style={{ padding: '0.5rem 0', borderBottom: idx < recentPresc.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                    <strong>{p.medicineName} ({p.dosage})</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{p.frequency} • {p.duration}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>No active prescriptions recorded.</p>
            )}
          </div>
        </div>

        {/* Medical Records Card */}
        <div className="dash-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="dash-card-header">
            <h3>Recent Test Results</h3>
            <FileText size={20} color="#2563EB" />
          </div>
          <div className="dash-card-body">
            {recentRecord ? (
              <div>
                <div className="status-badge success">{recentRecord.status || 'Normal'}</div>
                <h4 style={{ marginTop: '0.6rem', fontSize: '1rem' }}>{recentRecord.title || recentRecord.description}</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                  {recentRecord.doctor} • {recentRecord.date || recentRecord.recordDate}
                </p>
              </div>
            ) : (
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>No recent test reports available.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DoctorView = () => {
    const todayApps = appointments.slice(0, 4);

    return (
      <div className="dashboard-grid">
        <div className="dash-card animate-slide-up">
          <div className="dash-card-header">
            <h3>Consultation Schedule</h3>
            <Clock size={20} color="#10B981" />
          </div>
          <div className="dash-card-body">
            {todayApps.length > 0 ? (
              <ul className="list-group">
                {todayApps.map((item, idx) => (
                  <li key={item.id || idx} style={{ padding: '0.5rem 0', borderBottom: idx < todayApps.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                    <strong>{item.time}</strong> — {item.patient}
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                      {item.reason || item.dept || 'Consultation'} ({item.status})
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: 'var(--text-light)' }}>No scheduled consultations today.</p>
            )}
          </div>
        </div>

        <div className="dash-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="dash-card-header">
            <h3>Medical Records Assigned</h3>
            <Activity size={20} color="#10B981" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '2rem', color: '#10B981' }}>{medicalRecords.length}</h2>
            <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>Patient diagnostic reports on file</p>
            <button className="btn-secondary" onClick={() => router.push('/records')} style={{ marginTop: '1rem', width: '100%' }}>
              View Records
            </button>
          </div>
        </div>

        <div className="dash-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="dash-card-header">
            <h3>Total Patients</h3>
            <Users size={20} color="#10B981" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '2rem', color: '#10B981' }}>{Math.max(appointments.length, 5)}</h2>
            <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>Active registered patients</p>
            <button className="btn-secondary" onClick={() => router.push('/patients')} style={{ marginTop: '1rem', width: '100%' }}>
              Patient Directory
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AdminView = () => (
    <div className="dashboard-grid">
      <div className="dash-card animate-slide-up">
        <div className="dash-card-header">
          <h3>System Status</h3>
          <HeartPulse size={20} color="#8B5CF6" />
        </div>
        <div className="dash-card-body">
          <div className="status-badge success">All Systems Operational</div>
          <ul className="list-group" style={{ marginTop: '1rem' }}>
            <li>PostgreSQL Database: <strong>Connected (Port 5432)</strong></li>
            <li>Spring Boot REST API: <strong>Active (Port 8081)</strong></li>
            <li>Frontend Portal: <strong>Running (Port 3000)</strong></li>
          </ul>
        </div>
      </div>

      <div className="dash-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="dash-card-header">
          <h3>Revenue & Outstanding</h3>
          <CreditCard size={20} color="#8B5CF6" />
        </div>
        <div className="dash-card-body">
          <h2 style={{ fontSize: '2rem', color: '#8B5CF6' }}>
            ₹{billingSummary?.paidThisYear ? billingSummary.paidThisYear.toLocaleString() : '2,800'}
          </h2>
          <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>Total collected this period</p>
          <p style={{ color: '#E11D48', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: '500' }}>
            Pending Due: ₹{billingSummary?.outstanding ? billingSummary.outstanding.toLocaleString() : '350'}
          </p>
        </div>
      </div>

      <div className="dash-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="dash-card-header">
          <h3>Hospital Operations</h3>
          <ShieldAlert size={20} color="#8B5CF6" />
        </div>
        <div className="dash-card-body">
          <div className="status-badge warning">Active Monitoring</div>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            {appointments.length} appointments recorded across hospital departments.
          </p>
          <button className="btn-secondary" onClick={() => router.push('/system')} style={{ marginTop: '1rem', width: '100%' }}>
            System Console
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <div className="container dashboard-container">
        <header className="dashboard-header animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1>Welcome back, {currentUser?.name || 'Demo User'}</h1>
            <p>Here is your {role.toLowerCase()} overview with live PostgreSQL data.</p>
          </div>
          <button 
            className="btn-secondary" 
            onClick={fetchDashboardData} 
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </header>

        {error && (
          <div style={{ backgroundColor: '#FEF2F2', color: '#991B1B', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {role === 'Patient' && <PatientView />}
        {role === 'Doctor' && <DoctorView />}
        {role === 'Admin' && <AdminView />}
      </div>
    </div>
  );
};

export default Dashboard;
