package com.medisphere.controller;

import com.medisphere.model.User;
import com.medisphere.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserRepository userRepository;

    public ProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{role}")
    public ResponseEntity<User> getProfileByRole(@PathVariable String role) {
        java.util.List<User> users = userRepository.findByRole(role);
        if (!users.isEmpty()) {
            return ResponseEntity.ok(users.get(0));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/by-email")
    public ResponseEntity<User> getProfileByEmail(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<User> updateProfile(@RequestBody User updatedUser) {
        if (updatedUser.getEmail() != null) {
            Optional<User> userOpt = userRepository.findByEmail(updatedUser.getEmail());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                if (updatedUser.getName() != null) user.setName(updatedUser.getName());
                if (updatedUser.getPhone() != null) user.setPhone(updatedUser.getPhone());
                if (updatedUser.getAddress() != null) user.setAddress(updatedUser.getAddress());
                if (updatedUser.getDob() != null) user.setDob(updatedUser.getDob());
                if (updatedUser.getBloodGroup() != null) user.setBloodGroup(updatedUser.getBloodGroup());
                if (updatedUser.getSpecialty() != null) user.setSpecialty(updatedUser.getSpecialty());
                if (updatedUser.getDepartment() != null) user.setDepartment(updatedUser.getDepartment());
                return ResponseEntity.ok(userRepository.save(user));
            }
        }
        return ResponseEntity.ok(userRepository.save(updatedUser));
    }
}
