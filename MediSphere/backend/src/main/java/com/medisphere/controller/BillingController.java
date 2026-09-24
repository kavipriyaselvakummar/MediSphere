package com.medisphere.controller;

import com.medisphere.model.Invoice;
import com.medisphere.repository.InvoiceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/billing")
public class BillingController {

    private final InvoiceRepository invoiceRepository;

    public BillingController(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceRepository.findAll());
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getBillingSummary() {
        List<Invoice> invoices = invoiceRepository.findAll();
        double outstanding = 0.0;
        double paidThisYear = 0.0;
        double insuranceCovered = 0.0;
        int pendingCount = 0;
        int paidCount = 0;

        for (Invoice inv : invoices) {
            if ("Pending".equalsIgnoreCase(inv.getStatus())) {
                outstanding += (inv.getAmount() - inv.getInsuranceCovered());
                pendingCount++;
            } else {
                paidThisYear += (inv.getAmount() - inv.getInsuranceCovered());
                paidCount++;
            }
            insuranceCovered += inv.getInsuranceCovered();
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("outstanding", outstanding);
        summary.put("pendingCount", pendingCount);
        summary.put("paidThisYear", paidThisYear);
        summary.put("paidCount", paidCount);
        summary.put("insuranceCovered", insuranceCovered);
        summary.put("provider", "BlueCross Health");

        return ResponseEntity.ok(summary);
    }

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        if (invoice.getInvoiceNumber() == null || invoice.getInvoiceNumber().isBlank()) {
            invoice.setInvoiceNumber("INV-" + (1000 + invoiceRepository.count() + 1));
        }
        if (invoice.getStatus() == null || invoice.getStatus().isBlank()) {
            invoice.setStatus("Pending");
        }
        if (invoice.getInsuranceCovered() == null) {
            invoice.setInsuranceCovered(0.0);
        }
        if (invoice.getAmount() == null) {
            invoice.setAmount(0.0);
        }
        invoice.setAmountDue(Math.max(0.0, invoice.getAmount() - invoice.getInsuranceCovered()));
        Invoice saved = invoiceRepository.save(invoice);
        return ResponseEntity.ok(saved);
    }
}
