package com.medisphere.model;

import jakarta.persistence.*;

@Entity
@Table(name = "notifications")
public class NotificationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String notificationCode; // e.g. N001
    private String type; // "appointment", "result", "billing"
    private String title;
    @Column(length = 1000)
    private String message;
    private String timestampStr;
    private boolean read;

    public NotificationItem() {}

    public NotificationItem(String notificationCode, String type, String title, String message, String timestampStr, boolean read) {
        this.notificationCode = notificationCode;
        this.type = type;
        this.title = title;
        this.message = message;
        this.timestampStr = timestampStr;
        this.read = read;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNotificationCode() { return notificationCode; }
    public void setNotificationCode(String notificationCode) { this.notificationCode = notificationCode; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTimestampStr() { return timestampStr; }
    public void setTimestampStr(String timestampStr) { this.timestampStr = timestampStr; }

    public boolean isRead() { return read; }
    public void setRead(boolean read) { this.read = read; }
}
