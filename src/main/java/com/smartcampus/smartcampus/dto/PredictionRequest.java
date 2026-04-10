package com.smartcampus.smartcampus.dto;

import lombok.Data;

@Data
public class PredictionRequest {
    private String studentEmail;
    private String subject;
    private double attendancePercentage;
    private double internalMarks;
    private double assignmentScore;
}