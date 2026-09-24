package com.medisphere.controller;

import com.medisphere.model.MedicalRecord;
import com.medisphere.repository.MedicalRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/records")
public class MedicalRecordController {

    private final MedicalRecordRepository medicalRecordRepository;

    public MedicalRecordController(MedicalRecordRepository medicalRecordRepository) {
        this.medicalRecordRepository = medicalRecordRepository;
    }

    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllRecords() {
        return ResponseEntity.ok(medicalRecordRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<MedicalRecord> createRecord(@RequestBody MedicalRecord record) {
        if (record.getCode() == null || record.getCode().isBlank()) {
            record.setCode("R00" + (medicalRecordRepository.count() + 1));
        }
        MedicalRecord saved = medicalRecordRepository.save(record);
        return ResponseEntity.ok(saved);
    }
}
