package com.smartcampus.smartcampus.controller;

import com.smartcampus.smartcampus.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AttendanceReportController {

    private final AttendanceRepository attendanceRepository;

    @GetMapping("/attendance-percentage")
    public ResponseEntity<Map<String, Object>> getAttendancePercentage(
            @RequestParam String studentEmail,
            @RequestParam String subject,
            @RequestParam long totalClasses) {

        long attended = attendanceRepository
                .countByStudentEmailAndSubject(studentEmail, subject);

        double percentage = ((double) attended / totalClasses) * 100;

        Map<String, Object> report = new HashMap<>();
        report.put("studentEmail", studentEmail);
        report.put("subject", subject);
        report.put("totalClasses", totalClasses);
        report.put("classesAttended", attended);
        report.put("attendancePercentage", Math.round(percentage) + "%");
        report.put("status", percentage >= 75 ? "SAFE" : "SHORT");

        return ResponseEntity.ok(report);
    }

    @GetMapping("/all-students/{subject}")
    public ResponseEntity<?> getAllStudentsReport(
            @PathVariable String subject) {

        return ResponseEntity.ok(
                attendanceRepository.findBySubject(subject));
    }
}