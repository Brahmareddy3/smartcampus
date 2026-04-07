package com.smartcampus.smartcampus.controller;

import com.google.zxing.WriterException;
import com.smartcampus.smartcampus.service.QrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/qr")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QrController {

    private final QrService qrService;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, String>> generateQr(
            @RequestParam String subject,
            @RequestParam String facultyEmail) throws WriterException, IOException {

        String token = qrService.generateQrAndGetToken(subject, facultyEmail);

        Map<String, String> response = new HashMap<>();
        response.put("qrToken", token);
        response.put("subject", subject);
        response.put("message", "QR valid for 60 seconds!");

        return ResponseEntity.ok(response);
    }
}