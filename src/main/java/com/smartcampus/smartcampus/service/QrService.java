package com.smartcampus.smartcampus.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.smartcampus.smartcampus.entity.QrSession;
import com.smartcampus.smartcampus.repository.QrSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QrService {

    private final QrSessionRepository qrSessionRepository;

    public byte[] generateQr(String subject, String facultyEmail)
            throws WriterException, IOException {

        // Generate unique token
        String token = UUID.randomUUID().toString();

        // Save QR session to database
        QrSession session = new QrSession();
        session.setSubject(subject);
        session.setFacultyEmail(facultyEmail);
        session.setQrToken(token);
        session.setCreatedAt(LocalDateTime.now());
        session.setExpiresAt(LocalDateTime.now().plusSeconds(60));
        session.setActive(true);

        qrSessionRepository.save(session);

        // Generate QR image
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(
                token, BarcodeFormat.QR_CODE, 300, 300
        );

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        return outputStream.toByteArray();
    }

    public boolean isQrValid(String token) {
        return qrSessionRepository.findByQrToken(token)
                .map(session -> session.isActive() &&
                        session.getExpiresAt().isAfter(LocalDateTime.now()))
                .orElse(false);
    }

    public String getSubjectByToken(String token) {
        return qrSessionRepository.findByQrToken(token)
                .map(QrSession::getSubject)
                .orElse(null);
    }
    public String generateQrAndGetToken(String subject, String facultyEmail)
        throws WriterException, IOException {

    String token = UUID.randomUUID().toString();

    QrSession session = new QrSession();
    session.setSubject(subject);
    session.setFacultyEmail(facultyEmail);
    session.setQrToken(token);
    session.setCreatedAt(LocalDateTime.now());
    session.setExpiresAt(LocalDateTime.now().plusSeconds(60));
    session.setActive(true);

    qrSessionRepository.save(session);
    return token;
}
}