# 🎓 SmartCampus — AI-Powered College ERP System

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.1-green)
![Java](https://img.shields.io/badge/Java-21-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-red)

## 📌 About
SmartCampus is a real-time, AI-powered College ERP System built with Spring Boot. It enables QR-based attendance, real-time notifications, and AI performance prediction.

## 🚀 Features
- ✅ JWT Authentication with Role-based Access (Student, Faculty, Admin)
- ✅ QR Code Attendance System (expires in 60 seconds)
- ✅ Real-time Notifications via WebSocket
- ✅ AI Performance Predictor (Pass/Fail prediction)
- ✅ Analytics Dashboard (Subject-wise, Top Students)

## 🛠️ Tech Stack
| Technology | Usage |
|---|---|
| Java 21 | Programming Language |
| Spring Boot 3.5.1 | Backend Framework |
| Spring Security + JWT | Authentication |
| Spring Data JPA | Database ORM |
| MySQL 8.0 | Database |
| WebSocket (STOMP) | Real-time Communication |
| ZXing | QR Code Generation |
| Gradle | Build Tool |

## ⚙️ Setup Instructions

### Steps
1. Clone the repository
git clone https://github.com/Brahmareddy3/smartcampus.git

2. Create MySQL database
CREATE DATABASE smartcampus;

3. Run the project
./gradlew bootRun

## 📡 API Endpoints

### Auth APIs
| Method | URL | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login & get JWT |

### QR Attendance APIs
| Method | URL | Description |
|---|---|---|
| POST | /api/qr/generate | Generate QR code |
| POST | /api/attendance/mark | Mark attendance |
| GET | /api/attendance/student/{email} | Get student attendance |

### AI & Analytics APIs
| Method | URL | Description |
|---|---|---|
| POST | /api/ai/predict | Predict performance |
| GET | /api/analytics/campus | Campus analytics |
| GET | /api/analytics/top-students | Top students |

## 👨‍💻 Developer
**Muttireddy Brahma Reddy**
- GitHub: [@Brahmareddy3](https://github.com/Brahmareddy3)