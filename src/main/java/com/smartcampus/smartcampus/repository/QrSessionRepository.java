package com.smartcampus.smartcampus.repository;

import com.smartcampus.smartcampus.entity.QrSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QrSessionRepository extends JpaRepository<QrSession, Long> {

    Optional<QrSession> findByQrToken(String qrToken);

    Optional<QrSession> findBySubjectAndFacultyEmailAndActiveTrue(
        String subject, String facultyEmail
    );
}