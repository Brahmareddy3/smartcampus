package com.smartcampus.smartcampus.controller;

import com.smartcampus.smartcampus.dto.PredictionRequest;
import com.smartcampus.smartcampus.dto.PredictionResponse;
import com.smartcampus.smartcampus.service.AiPredictorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiPredictorController {

    private final AiPredictorService aiPredictorService;

    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predict(
            @RequestBody PredictionRequest request) {
        return ResponseEntity.ok(aiPredictorService.predict(request));
    }
}