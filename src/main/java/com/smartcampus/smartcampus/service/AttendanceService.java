package com.smartcampus.smartcampus.service;

import com.smartcampus.smartcampus.entity.Attendance;
import com.smartcampus.smartcampus.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final QrService qrService;

    public String markAttendance(String studentEmail, String qrToken) {

        // Check if QR is valid and not expired
        if (!qrService.isQrValid(qrToken)) {
            return "QR code is invalid or expired!";
        }

        // Check if student already marked attendance
        if (attendanceRepository.existsByStudentEmailAndQrToken(
                studentEmail, qrToken)) {
            return "Attendance already marked!";
        }

        // Get subject from QR token
        String subject = qrService.getSubjectByToken(qrToken);

        // Save attendance
        Attendance attendance = new Attendance();
        attendance.setStudentEmail(studentEmail);
        attendance.setSubject(subject);
        attendance.setAttendedAt(LocalDateTime.now());
        attendance.setQrToken(qrToken);

        attendanceRepository.save(attendance);

        return "Attendance marked successfully!";
    }

    public List<Attendance> getAttendanceByStudent(String studentEmail) {
        return attendanceRepository.findByStudentEmail(studentEmail);
    }

    public List<Attendance> getAttendanceBySubject(String subject) {
        return attendanceRepository.findBySubject(subject);
    }

    public Map<String, Object> getAttendanceReport(
            String studentEmail, String subject) {

        long attended = attendanceRepository
                .countByStudentEmailAndSubject(studentEmail, subject);

        Map<String, Object> report = new HashMap<>();
        report.put("studentEmail", studentEmail);
        report.put("subject", subject);
        report.put("classesAttended", attended);

        return report;
    }
}