// HealSync REST API Client connecting Next.js to Spring Boot PostgreSQL Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081/api';

export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    // Handle 204 No Content
    if (response.status === 204) {
      return { success: true };
    }
    return await response.json();
  } catch (error) {
    console.warn(`[Spring Boot API] Call to ${endpoint} failed, utilizing local fallback.`, error);
    return null;
  }
};

export const api = {
  // Auth REST APIs
  login: async (email, password, role) => {
    return await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  },

  register: async (userData) => {
    return await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Appointments REST APIs
  getAppointments: async (search = '', status = 'All') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status && status !== 'All') params.append('status', status);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await apiCall(`/appointments${query}`);
  },

  createAppointment: async (appointmentData) => {
    return await apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },

  updateAppointmentStatus: async (id, status) => {
    return await apiCall(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  deleteAppointment: async (id) => {
    return await apiCall(`/appointments/${id}`, {
      method: 'DELETE',
    });
  },

  // Medical Records REST APIs
  getMedicalRecords: async () => {
    return await apiCall('/records');
  },

  createMedicalRecord: async (recordData) => {
    return await apiCall('/records', {
      method: 'POST',
      body: JSON.stringify(recordData),
    });
  },

  // Prescriptions REST APIs
  getPrescriptions: async (patient = '') => {
    const query = patient ? `?patient=${encodeURIComponent(patient)}` : '';
    return await apiCall(`/prescriptions${query}`);
  },

  createPrescription: async (prescriptionData) => {
    return await apiCall('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
  },

  // Billing REST APIs
  getInvoices: async () => {
    return await apiCall('/billing');
  },

  createInvoice: async (invoiceData) => {
    return await apiCall('/billing', {
      method: 'POST',
      body: JSON.stringify(invoiceData),
    });
  },

  getBillingSummary: async () => {
    return await apiCall('/billing/summary');
  },

  // Notifications REST APIs
  getNotifications: async () => {
    return await apiCall('/notifications');
  },

  markNotificationsRead: async () => {
    return await apiCall('/notifications/read-all', {
      method: 'PUT',
    });
  },

  // Profile REST APIs
  getProfile: async (role) => {
    return await apiCall(`/profile/${role}`);
  },

  getProfileByEmail: async (email) => {
    return await apiCall(`/profile/by-email?email=${encodeURIComponent(email)}`);
  },

  updateProfile: async (profileData) => {
    return await apiCall('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};
