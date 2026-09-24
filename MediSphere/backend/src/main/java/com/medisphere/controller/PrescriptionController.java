package com.medisphere.controller;

import com.medisphere.model.Prescription;
import com.medisphere.repository.PrescriptionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionController(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Prescription>> getAllPrescriptions(@RequestParam(required = false) String patient) {
        if (patient != null && !patient.isBlank()) {
            return ResponseEntity.ok(prescriptionRepository.findByPatientContainingIgnoreCase(patient));
        }
        return ResponseEntity.ok(prescriptionRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Prescription> createPrescription(@RequestBody Prescription prescription) {
        Prescription saved = prescriptionRepository.save(prescription);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
        if (prescriptionRepository.existsById(id)) {
            prescriptionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
