package com.smartcampus.smartcampus.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/api/notify/announcement")
    public String sendAnnouncement(@RequestParam String message) {
        messagingTemplate.convertAndSend("/topic/announcements", message);
        return "Announcement sent: " + message;
    }

    @PostMapping("/api/notify/attendance")
    public String sendAttendanceAlert(@RequestParam String studentEmail,
                                       @RequestParam String subject) {
        String msg = "Attendance marked for " + studentEmail + " in " + subject;
        messagingTemplate.convertAndSend("/topic/attendance", msg);
        return "Alert sent!";
    }

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        return message;
    }
}