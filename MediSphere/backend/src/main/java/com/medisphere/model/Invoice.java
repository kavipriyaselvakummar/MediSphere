package com.medisphere.model;

import jakarta.persistence.*;

@Entity
@Table(name = "invoices")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String invoiceNumber; // e.g. INV-1001
    private String patient;
    private String date;
    private String description;
    private Double amount;
    private Double insuranceCovered;
    private Double amountDue;
    private String status; // "Paid", "Pending"

    public Invoice() {}

    public Invoice(String invoiceNumber, String patient, String date, String description, Double amount, Double insuranceCovered, Double amountDue, String status) {
        this.invoiceNumber = invoiceNumber;
        this.patient = patient;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.insuranceCovered = insuranceCovered;
        this.amountDue = amountDue != null ? amountDue : (amount != null ? amount - (insuranceCovered != null ? insuranceCovered : 0) : 0);
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public String getPatient() { return patient; }
    public void setPatient(String patient) { this.patient = patient; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Double getInsuranceCovered() { return insuranceCovered; }
    public void setInsuranceCovered(Double insuranceCovered) { this.insuranceCovered = insuranceCovered; }

    public Double getAmountDue() { return amountDue; }
    public void setAmountDue(Double amountDue) { this.amountDue = amountDue; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
