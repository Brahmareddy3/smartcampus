package com.smartcampus.smartcampus.service;

import com.smartcampus.smartcampus.repository.AttendanceRepository;
import com.smartcampus.smartcampus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    public Map<String, Object> getCampusAnalytics() {
        Map<String, Object> analytics = new HashMap<>();

        long totalStudents = userRepository.countByRole("STUDENT");
        long totalAttendance = attendanceRepository.count();

        analytics.put("totalStudents", totalStudents);
        analytics.put("totalAttendanceRecords", totalAttendance);
        analytics.put("averageAttendance",
                totalStudents > 0 ? totalAttendance / totalStudents : 0);

        return analytics;
    }

    public Map<String, Long> getSubjectWiseAttendance() {
        List<Object[]> results = attendanceRepository.countBySubject();
        Map<String, Long> subjectStats = new LinkedHashMap<>();
        for (Object[] row : results) {
            subjectStats.put((String) row[0], (Long) row[1]);
        }
        return subjectStats;
    }

    public Map<String, Long> getTopStudents() {
        List<Object[]> results = attendanceRepository.topStudentsByAttendance();
        Map<String, Long> topStudents = new LinkedHashMap<>();
        for (Object[] row : results) {
            topStudents.put((String) row[0], (Long) row[1]);
        }
        return topStudents;
    }
}