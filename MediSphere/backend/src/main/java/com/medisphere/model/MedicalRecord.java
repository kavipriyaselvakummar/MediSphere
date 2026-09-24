package com.medisphere.model;

import jakarta.persistence.*;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code; // e.g. R001
    private String date;
    private String type; // "Lab Report", "Prescription", "Scan"
    private String description;
    private String doctor;
    private String status; // "Normal", "Active", "Reviewed"
    private String file;

    public MedicalRecord() {}

    public MedicalRecord(String code, String date, String type, String description, String doctor, String status, String file) {
        this.code = code;
        this.date = date;
        this.type = type;
        this.description = description;
        this.doctor = doctor;
        this.status = status;
        this.file = file;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getFile() { return file; }
    public void setFile(String file) { this.file = file; }
}
