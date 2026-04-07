package com.smartcampus.smartcampus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "qr_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QrSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private String facultyEmail;

    private String qrToken;

    private LocalDateTime createdAt;

    private LocalDateTime expiresAt;

    private boolean active;
}
