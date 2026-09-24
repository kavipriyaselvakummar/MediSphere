"use client";
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, DollarSign, CheckCircle, Clock, Download, ShieldCheck, Plus, AlertCircle, RefreshCw 
} from 'lucide-react';
import { api } from '../services/api';
import './Dashboard.css';

export default function Billing() {
  const [invoices, setInvoices] = useState([]);
  const [summary, setSummary] = useState({
    outstanding: 350.00,
    pendingCount: 1,
    paidThisYear: 2800.00,
    paidCount: 2,
    insuranceCovered: 1450.00,
    provider: 'Star Health / HDFC ERGO'
  });
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formError, setFormError] = useState('');

  // Form State
  const [invPatient, setInvPatient] = useState('');
  const [invDesc, setInvDesc] = useState('');
  const [invAmount, setInvAmount] = useState('');
  const [invInsurance, setInvInsurance] = useState('');

  const fetchBillingData = async () => {
    setLoading(true);
    try {
      const [invoicesData, summaryData] = await Promise.all([
        api.getInvoices(),
        api.getBillingSummary()
      ]);

      if (invoicesData && Array.isArray(invoicesData)) {
        setInvoices(invoicesData);
      }
      if (summaryData) {
        setSummary(summaryData);
      }
    } catch (e) {
      console.error('Failed to load billing data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingData();
  }, []);

  const parsedAmount = parseFloat(invAmount) || 0;
  const parsedInsurance = parseFloat(invInsurance) || 0;
  const calculatedDue = Math.max(0, parsedAmount - parsedInsurance);

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!invDesc.trim()) {
      setFormError('Please enter a medical service or consultation description.');
      return;
    }
    if (parsedAmount <= 0) {
      setFormError('Total amount must be greater than ₹0.');
      return;
    }
    if (parsedInsurance < 0) {
      setFormError('Insurance covered amount cannot be negative.');
      return;
    }
    if (parsedInsurance > parsedAmount) {
      setFormError('Insurance covered amount cannot exceed the total amount.');
      return;
    }

    const newInvoice = {
      patient: invPatient.trim() || 'Demo Patient',
      description: invDesc.trim(),
      amount: parsedAmount,
      insuranceCovered: parsedInsurance,
      amountDue: calculatedDue,
      date: new Date().toISOString().split('T')[0],
      status: calculatedDue === 0 ? 'Paid' : 'Pending'
    };

    try {
      const created = await api.createInvoice(newInvoice);
      if (created) {
        setSuccessMessage('Invoice created successfully and stored in PostgreSQL.');
        fetchBillingData();
        setShowCreateModal(false);
        setInvPatient('');
        setInvDesc('');
        setInvAmount('');
        setInvInsurance('');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        setFormError('Could not save invoice to backend database.');
      }
    } catch (e) {
      setFormError('Error connecting to backend API.');
    }
  };

  return (
    <div className="container dashboard-container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-dark)' }}>Billing & Invoices</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>Track hospital payments, invoices, and insurance claims in Indian Rupees (₹)</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={fetchBillingData} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>{loading ? 'Syncing...' : 'Refresh'}</span>
          </button>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} /> Create Invoice
          </button>
        </div>
      </div>

      {successMessage && (
        <div style={{ backgroundColor: '#ECFDF5', color: '#065F46', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #A7F3D0' }}>
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Total Outstanding</h3>
            <DollarSign size={20} color="#f59e0b" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '2rem', color: '#f59e0b' }}>₹{(summary?.outstanding || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>{summary?.pendingCount || 0} invoice(s) pending payment</p>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Paid Revenue</h3>
            <CheckCircle size={20} color="#10B981" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '2rem', color: '#10B981' }}>₹{(summary?.paidThisYear || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>{summary?.paidCount || 0} invoice(s) cleared</p>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h3>Insurance Covered</h3>
            <ShieldCheck size={20} color="#2563EB" />
          </div>
          <div className="dash-card-body">
            <h2 style={{ fontSize: '2rem', color: '#2563EB' }}>₹{(summary?.insuranceCovered || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>Provider: {summary?.provider || 'Star Health'}</p>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
          <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <p>Loading invoice records from PostgreSQL...</p>
        </div>
      ) : (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Invoice History & Receipts</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 400 }}>{invoices.length} invoices recorded</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-light)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 1.5rem' }}>Invoice ID</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Description</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Total Amount</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Insurance Covered</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Amount Due</th>
                  <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => {
                  const due = inv.amountDue !== undefined ? inv.amountDue : Math.max(0, (inv.amount || 0) - (inv.insuranceCovered || 0));
                  return (
                    <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-dark)' }}>{inv.invoiceNumber || `INV-${1000 + inv.id}`}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-light)' }}>{inv.date}</td>
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-dark)' }}>{inv.description}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>₹{(inv.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#10B981' }}>₹{(inv.insuranceCovered || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: due > 0 ? '#E11D48' : '#10B981' }}>
                        ₹{due.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {inv.status === 'Paid' ? (
                          <span className="status-badge success">Paid</span>
                        ) : (
                          <span className="status-badge warning">Pending</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button 
                          className="btn-secondary" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                          onClick={() => setSelectedInvoice(inv)}
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowCreateModal(false)}>
          <div className="modal-container glass-modal animate-scale-in" onClick={e => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: 'var(--text-dark)' }}>Create New Invoice</h2>
            
            {formError && (
              <div style={{ backgroundColor: '#FEF2F2', color: '#991B1B', padding: '0.5rem 0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateInvoice}>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Patient Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Rahul Sharma" 
                  style={{ paddingLeft: '1rem' }}
                  value={invPatient}
                  onChange={e => setInvPatient(e.target.value)} 
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Description / Medical Service *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Cardiology ECG & Echo Consultation" 
                  style={{ paddingLeft: '1rem' }}
                  value={invDesc}
                  onChange={e => setInvDesc(e.target.value)} 
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Total Amount (₹) *</label>
                  <input 
                    type="number" 
                    step="1"
                    min="1"
                    className="form-input" 
                    placeholder="1500" 
                    style={{ paddingLeft: '1rem' }}
                    value={invAmount}
                    onChange={e => setInvAmount(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Insurance Covered (₹)</label>
                  <input 
                    type="number" 
                    step="1"
                    min="0"
                    className="form-input" 
                    placeholder="1000" 
                    style={{ paddingLeft: '1rem' }}
                    value={invInsurance}
                    onChange={e => setInvInsurance(e.target.value)}
                  />
                </div>
              </div>

              {/* Dynamic Live Due Calculation Preview */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Calculated Patient Balance:</span>
                <strong style={{ fontSize: '1.1rem', color: calculatedDue > 0 ? '#E11D48' : '#10B981' }}>
                  ₹{calculatedDue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Generate Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Receipt Modal Preview */}
      {selectedInvoice && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedInvoice(null)}>
          <div className="modal-container glass-modal animate-scale-in" onClick={e => e.stopPropagation()} style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-dark)' }}>
              Receipt - {selectedInvoice.invoiceNumber || `INV-${selectedInvoice.id}`}
            </h2>
            <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Issued Date: {selectedInvoice.date} • Patient: {selectedInvoice.patient || 'Demo Patient'}
            </p>
            
            <div style={{ backgroundColor: 'var(--bg-color)', padding: '1.25rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-light)' }}>Service:</span>
                <strong>{selectedInvoice.description}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-light)' }}>Total Charge:</span>
                <strong>₹{(selectedInvoice.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#10B981' }}>
                <span>Insurance Deducted:</span>
                <strong>-₹{(selectedInvoice.insuranceCovered || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.75rem', fontSize: '1.1rem' }}>
                <span>Net Amount Due:</span>
                <strong style={{ color: (selectedInvoice.amount - selectedInvoice.insuranceCovered) > 0 ? '#E11D48' : '#10B981' }}>
                  ₹{Math.max(0, (selectedInvoice.amount || 0) - (selectedInvoice.insuranceCovered || 0)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setSelectedInvoice(null)}>Close</button>
              <button className="btn-primary" onClick={() => { alert(`Receipt for ${selectedInvoice.invoiceNumber || selectedInvoice.id} downloaded.`); setSelectedInvoice(null); }}>
                <Download size={16} /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
