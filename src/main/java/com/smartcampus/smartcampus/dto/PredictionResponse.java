package com.smartcampus.smartcampus.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PredictionResponse {
    private String studentEmail;
    private String subject;
    private double riskScore;
    private String prediction;
    private String recommendation;
}