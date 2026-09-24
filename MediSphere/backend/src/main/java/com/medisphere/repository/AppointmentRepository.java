package com.medisphere.repository;

import com.medisphere.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientContainingIgnoreCaseOrDoctorContainingIgnoreCaseOrDeptContainingIgnoreCase(String patient, String doctor, String dept);
    List<Appointment> findByStatus(String status);
}
