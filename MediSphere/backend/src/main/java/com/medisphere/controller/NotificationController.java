package com.medisphere.controller;

import com.medisphere.model.NotificationItem;
import com.medisphere.repository.NotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public ResponseEntity<List<NotificationItem>> getAllNotifications() {
        return ResponseEntity.ok(notificationRepository.findAll());
    }

    @PutMapping("/read-all")
    public ResponseEntity<List<NotificationItem>> markAllRead() {
        List<NotificationItem> notifications = notificationRepository.findAll();
        for (NotificationItem n : notifications) {
            n.setRead(true);
        }
        notificationRepository.saveAll(notifications);
        return ResponseEntity.ok(notifications);
    }
}
