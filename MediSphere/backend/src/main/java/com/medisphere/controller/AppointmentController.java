package com.medisphere.controller;

import com.medisphere.model.Appointment;
import com.medisphere.repository.AppointmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;

    public AppointmentController(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status) {
        
        if (status != null && !status.isBlank() && !"All".equalsIgnoreCase(status)) {
            return ResponseEntity.ok(appointmentRepository.findByStatus(status));
        }

        if (search != null && !search.isBlank()) {
            return ResponseEntity.ok(appointmentRepository.findByPatientContainingIgnoreCaseOrDoctorContainingIgnoreCaseOrDeptContainingIgnoreCase(search, search, search));
        }

        return ResponseEntity.ok(appointmentRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) {
        if (appointment.getCode() == null || appointment.getCode().isBlank()) {
            appointment.setCode("A00" + (appointmentRepository.count() + 1));
        }
        if (appointment.getStatus() == null || appointment.getStatus().isBlank()) {
            appointment.setStatus("Confirmed");
        }
        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable Long id, @RequestBody Appointment update) {
        return appointmentRepository.findById(id).map(app -> {
            app.setStatus(update.getStatus());
            return ResponseEntity.ok(appointmentRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }
}
