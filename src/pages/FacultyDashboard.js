import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FacultyDashboard() {
  const [subject, setSubject] = useState('');
  const [qrToken, setQrToken] = useState('');
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'faculty@gmail.com';

  const generateQr = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8082/api/qr/generate?subject=${subject}&facultyEmail=${email}`
      );
      setQrToken(res.data.qrToken);
    } catch (err) {
      console.log(err);
    }
  };

  const getAttendance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/api/attendance/subject/${subject}`
      );
      setAttendance(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>👨‍🏫 Faculty Dashboard</h1>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>📱 Generate QR Code</h2>
          <input
            style={styles.input}
            placeholder="Enter Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button style={styles.button} onClick={generateQr}>
            Generate QR
          </button>
          {qrToken && (
            <div style={styles.tokenBox}>
              <p>✅ QR Token Generated!</p>
              <p style={styles.token}>{qrToken}</p>
              <p style={styles.expires}>⏰ Expires in 60 seconds!</p>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h2>📊 View Attendance</h2>
          <input
            style={styles.input}
            placeholder="Enter Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <button style={styles.button} onClick={getAttendance}>
            Get Attendance
          </button>
          {attendance.length === 0 ? (
            <p>No records found!</p>
          ) : (
            attendance.map((a, i) => (
              <div key={i} style={styles.record}>
                <p>👤 Student: {a.studentEmail}</p>
                <p>🕐 Date: {new Date(a.attendedAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { color: '#34a853', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#34a853', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#ea4335', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  tokenBox: { backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px', marginTop: '10px' },
  token: { fontFamily: 'monospace', fontSize: '12px', wordBreak: 'break-all', color: '#1a73e8' },
  expires: { color: '#ea4335', fontWeight: 'bold' },
  record: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', marginTop: '10px' },
};

export default FacultyDashboard;