# 🎓 SmartCampus — AI-Powered College ERP System

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.1-green)
![Java](https://img.shields.io/badge/Java-21-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-red)

## 📌 About
SmartCampus is a real-time, AI-powered College ERP System built with Spring Boot.

## 🚀 Features
- ✅ JWT Authentication (Student, Faculty, Admin)
- ✅ QR Code Attendance (expires in 60 seconds)
- ✅ Real-time WebSocket Notifications
- ✅ AI Performance Predictor
- ✅ Analytics Dashboard

## 🛠️ Tech Stack
| Technology | Usage |
|---|---|
| Java 21 | Programming Language |
| Spring Boot 3.5.1 | Backend Framework |
| Spring Security + JWT | Authentication |
| MySQL 8.0 | Database |
| WebSocket | Real-time Communication |
| ZXing | QR Code Generation |

## ⚙️ Setup
1. Clone repo: `git clone https://github.com/Brahmareddy3/smartcampus.git`
2. Create database: `CREATE DATABASE smartcampus;`
3. Update password in `application.properties`
4. Run: `./gradlew bootRun`

## 📡 API Endpoints
| Method | URL | Description |
|---|---|---|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| POST | /api/qr/generate | Generate QR |
| POST | /api/attendance/mark | Mark Attendance |
| POST | /api/ai/predict | AI Prediction |
| GET | /api/analytics/campus | Analytics |

## 👨‍💻 Developer
**Muttireddy Brahma Reddy**
GitHub: [@Brahmareddy3](https://github.com/Brahmareddy3)