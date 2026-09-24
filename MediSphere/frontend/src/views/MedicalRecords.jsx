"use client";
import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Plus, Search, Filter, CheckCircle, AlertCircle, RefreshCw, Calendar, User
} from 'lucide-react';
import { api } from '../services/api';
import './Dashboard.css';

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');

  // Form State
  const [docType, setDocType] = useState('Lab Report');
  const [desc, setDesc] = useState('');
  const [doctor, setDoctor] = useState('Dr. Sarah Jenkins');
  const [recDate, setRecDate] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await api.getMedicalRecords();
      if (data && Array.isArray(data)) {
        setRecords(data);
      }
    } catch (e) {
      console.error('Failed to load medical records:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleAddRecord = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!desc.trim()) {
      setFormError('Please enter a description or title for the record.');
      return;
    }
    if (!doctor.trim()) {
      setFormError('Attending physician name cannot be empty.');
      return;
    }
    if (!recDate) {
      setFormError('Please select a valid record date.');
      return;
    }

    const newRecord = {
      type: docType,
      description: desc.trim(),
      doctor: doctor.trim(),
      date: recDate,
      status: 'Normal',
      file: `${docType.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.pdf`
    };

    try {
      const created = await api.createMedicalRecord(newRecord);
      if (created) {
        setSuccessMessage('Medical record added successfully.');
        fetchRecords();
        setShowAddModal(false);
        setDesc('');
        setRecDate('');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setFormError('Could not save record to database.');
      }
    } catch (e) {
      setFormError('Error connecting to backend server.');
    }
  };

  const filteredRecords = records.filter(rec => {
    const matchesSearch = (rec.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (rec.doctor || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (rec.type || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || rec.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container dashboard-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>Medical Records & History</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>View test results, health history, and diagnostic reports stored in PostgreSQL</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={fetchRecords} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Syncing...' : 'Refresh'}</span>
          </button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={18} /> Add Medical Record
          </button>
        </div>
      </div>

      {successMessage && (
        <div style={{ backgroundColor: '#ECFDF5', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #A7F3D0' }}>
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Patient Health Overview Summary Card */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)', border: '1px solid #dbeafe' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary)' }}>Patient Clinical Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Blood Group</span>
            <p style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-dark)' }}>O positive (O+)</p>
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Known Allergies</span>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: '#ef4444' }}>Penicillin, Peanuts</p>
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Chronic Conditions</span>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-dark)' }}>Hypertension (Stable)</p>
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Primary Physician</span>
            <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-dark)' }}>Dr. Sarah Jenkins</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
          <input 
            type="text" 
            className="form-input" 
            placeholder="Search records by title, doctor, or type..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} style={{ color: 'var(--text-light)' }} />
          <select 
            className="form-input" 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ width: 'auto', paddingLeft: '1rem' }}
          >
            <option value="All">All Types</option>
            <option value="Lab Report">Lab Report</option>
            <option value="Prescription">Prescription</option>
            <option value="Scan">Scan</option>
            <option value="Doctor Note">Doctor Note</option>
          </select>
        </div>
      </div>

      {/* Medical Records Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
          <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <p>Loading medical records from PostgreSQL...</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--text-light)' }}>
          <FileText size={48} style={{ margin: '0 auto 1rem', color: '#94a3b8', display: 'block' }} />
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>No records found</h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Add a new test result or medical history report.</p>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            <Plus size={16} /> Add Medical Record
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Diagnostic Documents & Reports</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 400 }}>{filteredRecords.length} records</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-light)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Document Type</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Description / Title</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Attending Physician</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{rec.date || rec.recordDate}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} color="var(--primary)" />
                        {rec.type || rec.documentType}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-dark)' }}>{rec.description || rec.title}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-light)' }}>{rec.doctor}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span className="status-badge success">{rec.status || 'Normal'}</span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                      <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => alert(`Downloading ${rec.file || 'report.pdf'}...`)}>
                        <Download size={14} style={{ marginRight: 4 }} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Medical Record Modal */}
      {showAddModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowAddModal(false)}>
          <div className="modal-container glass-modal animate-scale-in" onClick={e => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: 'var(--text-dark)' }}>Add New Medical Record</h2>
            
            {formError && (
              <div style={{ backgroundColor: '#FEF2F2', color: '#991B1B', padding: '0.5rem 0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddRecord}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Document Type *</label>
                <select className="form-input" value={docType} onChange={e => setDocType(e.target.value)} style={{ paddingLeft: '1rem' }}>
                  <option value="Lab Report">Lab Report</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Scan">Scan / X-Ray</option>
                  <option value="Doctor Note">Doctor Clinical Note</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Description / Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Lipid Profile & Blood Glucose Panel" 
                  style={{ paddingLeft: '1rem' }}
                  value={desc}
                  onChange={e => setDesc(e.target.value)} 
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Attending Physician *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Dr. Sarah Jenkins" 
                    style={{ paddingLeft: '1rem' }}
                    value={doctor}
                    onChange={e => setDoctor(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Record Date *</label>
                  <input 
                    type="date" 
                    className="form-input" 
                    style={{ paddingLeft: '1rem' }}
                    value={recDate}
                    onChange={e => setRecDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save to Database</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
