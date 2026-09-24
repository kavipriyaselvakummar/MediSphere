export const mockAppointments = [
  { id: 'A001', patient: 'John Doe', doctor: 'Dr. Sarah Jenkins', dept: 'Cardiology', date: '2026-08-12', time: '10:00 AM', status: 'Confirmed' },
  { id: 'A002', patient: 'Alice Smith', doctor: 'Dr. Michael Chen', dept: 'Neurology', date: '2026-08-12', time: '11:30 AM', status: 'Pending' },
  { id: 'A003', patient: 'Robert Brown', doctor: 'Dr. Emily White', dept: 'Orthopedics', date: '2026-08-13', time: '02:00 PM', status: 'Cancelled' },
  { id: 'A004', patient: 'Emma Wilson', doctor: 'Dr. Sarah Jenkins', dept: 'Cardiology', date: '2026-08-14', time: '09:15 AM', status: 'Completed' },
];

export const mockMedicalRecords = [
  { id: 'R001', date: '2026-08-01', type: 'Lab Report', description: 'Complete Blood Count (CBC)', doctor: 'Dr. Sarah Jenkins', status: 'Normal', file: 'cbc_report.pdf' },
  { id: 'R002', date: '2026-07-15', type: 'Prescription', description: 'Lisinopril 10mg', doctor: 'Dr. Sarah Jenkins', status: 'Active', file: 'prescription.pdf' },
  { id: 'R003', date: '2026-06-20', type: 'Scan', description: 'Chest X-Ray', doctor: 'Dr. Emily White', status: 'Reviewed', file: 'xray.pdf' },
];

export const mockBilling = [
  { id: 'INV-1001', date: '2026-08-12', description: 'Cardiology Consultation', amount: 150.00, status: 'Paid', insuranceCovered: 100.00 },
  { id: 'INV-1002', date: '2026-08-01', description: 'Lab Tests (CBC)', amount: 85.00, status: 'Pending', insuranceCovered: 50.00 },
  { id: 'INV-1003', date: '2026-07-15', description: 'Prescription Refill', amount: 45.00, status: 'Paid', insuranceCovered: 45.00 },
];

export const mockNotifications = [
  { id: 'N001', type: 'appointment', title: 'Upcoming Appointment', message: 'You have a consultation with Dr. Jenkins tomorrow at 10:00 AM.', time: '2 hours ago', read: false },
  { id: 'N002', type: 'result', title: 'Lab Results Ready', message: 'Your recent CBC test results are now available in your portal.', time: '1 day ago', read: true },
  { id: 'N003', type: 'billing', title: 'Invoice Pending', message: 'You have an outstanding invoice (INV-1002) of $35.00.', time: '3 days ago', read: false },
];

export const mockProfile = {
  Patient: {
    name: 'Demo Patient',
    email: 'patient@medisphere.com',
    phone: '+1 (555) 123-4567',
    dob: '1985-04-12',
    bloodGroup: 'O+',
    address: '123 Health Ave, Medical City, MC 12345',
    allergies: ['Penicillin', 'Peanuts']
  },
  Doctor: {
    name: 'Dr. Sarah Jenkins',
    email: 'dr.jenkins@medisphere.com',
    phone: '+1 (555) 987-6543',
    specialty: 'Cardiology',
    licenseNo: 'MD12345678',
    address: 'Suite 400, MediSphere Central Wing'
  },
  Admin: {
    name: 'System Admin',
    email: 'admin@medisphere.com',
    phone: '+1 (800) 123-4567',
    department: 'IT Operations'
  }
};
