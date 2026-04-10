package com.smartcampus.smartcampus.controller;

import com.smartcampus.smartcampus.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/campus")
    public ResponseEntity<Map<String, Object>> getCampusAnalytics() {
        return ResponseEntity.ok(analyticsService.getCampusAnalytics());
    }

    @GetMapping("/subject-wise")
    public ResponseEntity<Map<String, Long>> getSubjectWiseAttendance() {
        return ResponseEntity.ok(analyticsService.getSubjectWiseAttendance());
    }

    @GetMapping("/top-students")
    public ResponseEntity<Map<String, Long>> getTopStudents() {
        return ResponseEntity.ok(analyticsService.getTopStudents());
    }
}