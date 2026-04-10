package com.smartcampus.smartcampus.service;

import com.smartcampus.smartcampus.dto.PredictionRequest;
import com.smartcampus.smartcampus.dto.PredictionResponse;
import org.springframework.stereotype.Service;

@Service
public class AiPredictorService {

    public PredictionResponse predict(PredictionRequest request) {

        // AI Logic — weighted scoring system
        double attendanceWeight = 0.40;
        double marksWeight = 0.40;
        double assignmentWeight = 0.20;

        // Normalize marks to 100
        double normalizedMarks = (request.getInternalMarks() / 30) * 100;
        double normalizedAssignment = (request.getAssignmentScore() / 20) * 100;

        // Calculate risk score (higher = better)
        double score = (request.getAttendancePercentage() * attendanceWeight)
                + (normalizedMarks * marksWeight)
                + (normalizedAssignment * assignmentWeight);

        // Round to 2 decimals
        score = Math.round(score * 100.0) / 100.0;

        // Prediction logic
        String prediction;
        String recommendation;

        if (score >= 75) {
            prediction = "PASS ✅";
            recommendation = "Great performance! Keep it up!";
        } else if (score >= 60) {
            prediction = "AVERAGE ⚠️";
            recommendation = "Needs improvement in attendance and marks!";
        } else if (score >= 40) {
            prediction = "AT RISK 🚨";
            recommendation = "Urgent: Attend all classes and study harder!";
        } else {
            prediction = "FAIL ❌";
            recommendation = "Critical: Meet your faculty immediately!";
        }

        return new PredictionResponse(
                request.getStudentEmail(),
                request.getSubject(),
                score,
                prediction,
                recommendation
        );
    }
}