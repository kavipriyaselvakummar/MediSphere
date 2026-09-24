package com.medisphere.service;

import com.medisphere.model.*;
import com.medisphere.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final MedicalRecordRepository medicalRecordRepository;
    private final InvoiceRepository invoiceRepository;
    private final NotificationRepository notificationRepository;
    private final PrescriptionRepository prescriptionRepository;

    public DataInitializer(UserRepository userRepository,
                           AppointmentRepository appointmentRepository,
                           MedicalRecordRepository medicalRecordRepository,
                           InvoiceRepository invoiceRepository,
                           NotificationRepository notificationRepository,
                           PrescriptionRepository prescriptionRepository) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.medicalRecordRepository = medicalRecordRepository;
        this.invoiceRepository = invoiceRepository;
        this.notificationRepository = notificationRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Pre-seed Users
            userRepository.save(new User("Demo Patient", "patient@medisphere.com", "password123", "+1 (555) 123-4567", "Patient", "1985-04-12", "O+", "123 Health Ave, Medical City, MC 12345", null, null, null));
            userRepository.save(new User("Dr. Sarah Jenkins", "dr.jenkins@medisphere.com", "password123", "+1 (555) 987-6543", "Doctor", null, null, "Suite 400, MediSphere Central Wing", "Cardiology", "MD12345678", "Cardiology"));
            userRepository.save(new User("Dr. Michael Chen", "dr.chen@medisphere.com", "password123", "+1 (555) 321-4567", "Doctor", null, null, "Suite 402, MediSphere Central Wing", "Neurology", "MD23456789", "Neurology"));
            userRepository.save(new User("Dr. Emily White", "dr.white@medisphere.com", "password123", "+1 (555) 456-7890", "Doctor", null, null, "Suite 405, MediSphere East Wing", "Orthopedics", "MD34567890", "Orthopedics"));
            userRepository.save(new User("Dr. Rajesh Patel", "dr.patel@medisphere.com", "password123", "+91 98765 43210", "Doctor", null, null, "Suite 101, HealSync Main Block", "Pediatrics", "MD45678901", "Pediatrics"));
            userRepository.save(new User("Dr. Amit Sharma", "dr.sharma@medisphere.com", "password123", "+91 98765 12345", "Doctor", null, null, "Suite 103, HealSync Main Block", "General Medicine", "MD56789012", "General Medicine"));
            userRepository.save(new User("Dr. Priya Nair", "dr.nair@medisphere.com", "password123", "+91 98765 67890", "Doctor", null, null, "Suite 202, HealSync West Block", "Dermatology", "MD67890123", "Dermatology"));
            userRepository.save(new User("Dr. Vikram Malhotra", "dr.malhotra@medisphere.com", "password123", "+91 98765 98765", "Doctor", null, null, "Suite 301, HealSync Oncology Tower", "Oncology", "MD78901234", "Oncology"));
            userRepository.save(new User("System Admin", "admin@medisphere.com", "password123", "+1 (800) 123-4567", "Admin", null, null, "MediSphere IT Operations Desk", null, null, "IT Operations"));
        }

        if (appointmentRepository.count() == 0) {
            // Pre-seed Appointments
            appointmentRepository.save(new Appointment("A001", "Demo Patient", "Dr. Sarah Jenkins", "Cardiology", "2026-08-26", "10:00 AM", "Confirmed", "Routine Heart Checkup"));
            appointmentRepository.save(new Appointment("A002", "Alice Smith", "Dr. Michael Chen", "Neurology", "2026-08-27", "11:30 AM", "Pending", "Migraine consultation"));
            appointmentRepository.save(new Appointment("A003", "Robert Brown", "Dr. Emily White", "Orthopedics", "2026-08-28", "02:00 PM", "Cancelled", "Knee joint checkup"));
            appointmentRepository.save(new Appointment("A004", "Emma Wilson", "Dr. Sarah Jenkins", "Cardiology", "2026-08-29", "09:15 AM", "Completed", "Post-op cardiology review"));
        }

        if (medicalRecordRepository.count() == 0) {
            // Pre-seed Medical Records
            medicalRecordRepository.save(new MedicalRecord("R001", "2026-08-01", "Lab Report", "Complete Blood Count (CBC)", "Dr. Sarah Jenkins", "Normal", "cbc_report.pdf"));
            medicalRecordRepository.save(new MedicalRecord("R002", "2026-07-15", "Prescription", "Lisinopril 10mg - Take 1 daily", "Dr. Sarah Jenkins", "Active", "prescription.pdf"));
            medicalRecordRepository.save(new MedicalRecord("R003", "2026-06-20", "Scan", "Chest X-Ray", "Dr. Emily White", "Reviewed", "xray.pdf"));
        }

        if (prescriptionRepository.count() == 0) {
            // Pre-seed Prescriptions
            prescriptionRepository.save(new Prescription("Demo Patient", "Dr. Sarah Jenkins", "Lisinopril", "10mg", "Once Daily", "30 Days", "Take with water every morning", "2026-08-15"));
            prescriptionRepository.save(new Prescription("Demo Patient", "Dr. Michael Chen", "Metformin", "500mg", "Twice Daily", "60 Days", "Take after meals", "2026-08-10"));
            prescriptionRepository.save(new Prescription("Demo Patient", "Dr. Emily White", "Paracetamol", "650mg", "As Needed", "5 Days", "For mild fever and body pain", "2026-08-05"));
        }

        if (invoiceRepository.count() == 0) {
            // Pre-seed Invoices
            invoiceRepository.save(new Invoice("INV-1001", "Demo Patient", "2026-08-12", "Cardiology Consultation", 1500.00, 1000.00, 500.00, "Paid"));
            invoiceRepository.save(new Invoice("INV-1002", "Demo Patient", "2026-08-01", "Lab Tests (CBC & Lipid Profile)", 850.00, 500.00, 350.00, "Pending"));
            invoiceRepository.save(new Invoice("INV-1003", "Demo Patient", "2026-07-15", "Pharmacy Prescription", 450.00, 450.00, 0.00, "Paid"));
        }

        if (notificationRepository.count() == 0) {
            // Pre-seed Notifications
            notificationRepository.save(new NotificationItem("N001", "appointment", "Upcoming Appointment", "You have a consultation with Dr. Jenkins scheduled soon.", "2 hours ago", false));
            notificationRepository.save(new NotificationItem("N002", "result", "Lab Results Ready", "Your recent CBC test results are now available in your portal.", "1 day ago", true));
            notificationRepository.save(new NotificationItem("N003", "billing", "Invoice Pending", "You have an outstanding invoice (INV-1002) of ₹350.", "3 days ago", false));
        }

        System.out.println(">>> HealSync Spring Boot PostgreSQL Database Pre-Seeded Successfully!");
    }
}
