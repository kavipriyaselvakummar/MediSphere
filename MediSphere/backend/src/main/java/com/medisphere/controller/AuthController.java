package com.medisphere.controller;

import com.medisphere.dto.AuthResponse;
import com.medisphere.dto.LoginRequest;
import com.medisphere.dto.RegisterRequest;
import com.medisphere.model.User;
import com.medisphere.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            // Default user fallback for demo
            String targetRole = request.getRole() != null ? request.getRole() : "Patient";
            java.util.List<User> roleUsers = userRepository.findByRole(targetRole);
            User roleUser = roleUsers.isEmpty() ? null : roleUsers.get(0);
            return ResponseEntity.ok(new AuthResponse(true, "Login successful", roleUser));
        }

        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (request.getRole() != null && !request.getRole().isBlank()) {
                user.setRole(request.getRole());
                userRepository.save(user);
            }
            return ResponseEntity.ok(new AuthResponse(true, "Login successful", user));
        }

        // Create user on the fly if not existing
        User newUser = new User();
        newUser.setName("User");
        newUser.setEmail(request.getEmail());
        newUser.setPassword(request.getPassword());
        newUser.setRole(request.getRole() != null ? request.getRole() : "Patient");
        userRepository.save(newUser);

        return ResponseEntity.ok(new AuthResponse(true, "Login successful", newUser));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        Optional<User> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.ok(new AuthResponse(false, "User with this email already exists", null));
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPhone(request.getPhone());
        newUser.setPassword(request.getPassword());
        newUser.setRole(request.getRole() != null ? request.getRole() : "Patient");

        userRepository.save(newUser);

        return ResponseEntity.ok(new AuthResponse(true, "User registered successfully", newUser));
    }
}
