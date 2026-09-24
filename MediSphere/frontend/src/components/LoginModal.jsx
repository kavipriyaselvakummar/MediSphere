"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, X, User, Stethoscope, Shield, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';
import './LoginModal.css';

const LoginModal = ({ role, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let loggedInUser = null;
    try {
      const res = await api.login(email, password, role);
      if (res && res.user) {
        loggedInUser = res.user;
      }
    } catch (err) {
      console.log("Using local auth fallback");
    }
    login(role, loggedInUser);
    setIsLoading(false);
    onClose();
    router.push('/dashboard');
  };

  const getRoleIcon = () => {
    switch(role) {
      case 'Patient': return <User size={28} />;
      case 'Doctor': return <Stethoscope size={28} />;
      case 'Admin': return <Shield size={28} />;
      default: return <User size={28} />;
    }
  };

  const getRoleColor = () => {
    switch(role) {
      case 'Patient': return '#2563EB';
      case 'Doctor': return '#10B981';
      case 'Admin': return '#8B5CF6';
      default: return '#2563EB';
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-container glass-modal animate-scale-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-role-icon" style={{ backgroundColor: `${getRoleColor()}20`, color: getRoleColor() }}>
            {getRoleIcon()}
          </div>
          <h2>{role} Login</h2>
          <p>Please enter your credentials to access the {role.toLowerCase()} portal.</p>
        </div>

        <form className="modal-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-container">
              <div className="input-icon"><Mail size={18} /></div>
              <input 
                type="email" 
                className="form-input" 
                placeholder={`Enter ${role.toLowerCase()} email`} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <div className="input-icon"><Lock size={18} /></div>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-input" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="modal-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember Me</span>
            </label>
            <Link href="#" className="forgot-password" style={{ color: getRoleColor() }}>Forgot Password?</Link>
          </div>

          <button 
            type="submit" 
            className="btn-primary modal-submit"
            style={{ backgroundColor: getRoleColor(), boxShadow: `0 4px 10px ${getRoleColor()}40` }}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Login to Dashboard'}
          </button>
        </form>

        <div className="modal-footer">
          <p>Don't have an account? <Link href="/register" onClick={onClose} style={{ color: getRoleColor(), fontWeight: 600 }}>Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
