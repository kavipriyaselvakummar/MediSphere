package com.medisphere.model;

import jakarta.persistence.*;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patient;
    private String doctor;
    private String medicineName;
    private String dosage;
    private String frequency;
    private String duration;
    private String instructions;
    private String prescriptionDate;

    public Prescription() {}

    public Prescription(String patient, String doctor, String medicineName, String dosage, String frequency, String duration, String instructions, String prescriptionDate) {
        this.patient = patient;
        this.doctor = doctor;
        this.medicineName = medicineName;
        this.dosage = dosage;
        this.frequency = frequency;
        this.duration = duration;
        this.instructions = instructions;
        this.prescriptionDate = prescriptionDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatient() { return patient; }
    public void setPatient(String patient) { this.patient = patient; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }

    public String getDosage() { return dosage; }
    public void setDosage(String dosage) { this.dosage = dosage; }

    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public String getPrescriptionDate() { return prescriptionDate; }
    public void setPrescriptionDate(String prescriptionDate) { this.prescriptionDate = prescriptionDate; }
}
