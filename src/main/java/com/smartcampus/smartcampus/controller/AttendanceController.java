package com.smartcampus.smartcampus.controller;

import com.smartcampus.smartcampus.entity.Attendance;
import com.smartcampus.smartcampus.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/mark")
    public ResponseEntity<String> markAttendance(
            @RequestParam String studentEmail,
            @RequestParam String qrToken) {

        String result = attendanceService.markAttendance(studentEmail, qrToken);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/student/{email}")
    public ResponseEntity<List<Attendance>> getStudentAttendance(
            @PathVariable String email) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByStudent(email));
    }

    @GetMapping("/subject/{subject}")
    public ResponseEntity<List<Attendance>> getSubjectAttendance(
            @PathVariable String subject) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceBySubject(subject));
    }

    @GetMapping("/report")
    public ResponseEntity<Map<String, Object>> getReport(
            @RequestParam String studentEmail,
            @RequestParam String subject) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceReport(studentEmail, subject));
    }
}