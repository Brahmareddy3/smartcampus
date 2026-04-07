package com.smartcampus.smartcampus.repository;

import com.smartcampus.smartcampus.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    List<Attendance> findByStudentEmail(String studentEmail);

    List<Attendance> findBySubject(String subject);

    boolean existsByStudentEmailAndQrToken(String studentEmail, String qrToken);

    List<Attendance> findByStudentEmailAndSubject(String studentEmail, String subject);

    long countByStudentEmailAndSubject(String studentEmail, String subject);
}