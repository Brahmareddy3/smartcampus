import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [qrToken, setQrToken] = useState('');
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'muttireddybrahmareddy@gmail.com';

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/attendance/student/${email}`);
      setAttendance(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const markAttendance = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8082/api/attendance/mark?studentEmail=${email}&qrToken=${qrToken}`
      );
      setMessage(res.data);
      fetchAttendance();
    } catch (err) {
      setMessage('Error marking attendance!');
    }
  };

  const getPrediction = async () => {
    try {
      const res = await axios.post('http://localhost:8082/api/ai/predict', {
        studentEmail: email,
        subject: 'Java',
        attendancePercentage: 75,
        internalMarks: 22,
        assignmentScore: 15
      });
      setPrediction(res.data);
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
        <h1 style={styles.title}>🎓 Student Dashboard</h1>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>📱 Mark Attendance</h2>
          <input
            style={styles.input}
            placeholder="Enter QR Token"
            value={qrToken}
            onChange={(e) => setQrToken(e.target.value)}
          />
          <button style={styles.button} onClick={markAttendance}>
            Mark Attendance
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </div>

        <div style={styles.card}>
          <h2>📊 My Attendance</h2>
          {attendance.length === 0 ? (
            <p>No attendance records found!</p>
          ) : (
            attendance.map((a, i) => (
              <div key={i} style={styles.record}>
                <p>📚 Subject: {a.subject}</p>
                <p>🕐 Date: {new Date(a.attendedAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>

        <div style={styles.card}>
          <h2>🤖 AI Performance Prediction</h2>
          <button style={styles.button} onClick={getPrediction}>
            Get Prediction
          </button>
          {prediction && (
            <div style={styles.prediction}>
              <p>Risk Score: {prediction.riskScore}</p>
              <p>Prediction: {prediction.prediction}</p>
              <p>Recommendation: {prediction.recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { color: '#1a73e8', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#ea4335', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  message: { color: 'green', marginTop: '10px' },
  record: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', marginTop: '10px' },
  prediction: { backgroundColor: '#e8f4fd', padding: '15px', borderRadius: '8px', marginTop: '10px' },
};

export default StudentDashboard;