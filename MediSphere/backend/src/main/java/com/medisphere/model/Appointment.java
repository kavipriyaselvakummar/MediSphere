package com.medisphere.model;

import jakarta.persistence.*;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code; // e.g. A001
    private String patient;
    private String doctor;
    private String dept;
    private String date;
    private String time;
    private String status; // "Confirmed", "Pending", "Cancelled", "Completed"
    private String reason;

    public Appointment() {}

    public Appointment(String code, String patient, String doctor, String dept, String date, String time, String status, String reason) {
        this.code = code;
        this.patient = patient;
        this.doctor = doctor;
        this.dept = dept;
        this.date = date;
        this.time = time;
        this.status = status;
        this.reason = reason;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getPatient() { return patient; }
    public void setPatient(String patient) { this.patient = patient; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public String getDept() { return dept; }
    public void setDept(String dept) { this.dept = dept; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
