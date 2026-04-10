import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [topStudents, setTopStudents] = useState({});
  const [subjectWise, setSubjectWise] = useState({});
  const [announcement, setAnnouncement] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const campus = await axios.get('http://localhost:8082/api/analytics/campus');
      const top = await axios.get('http://localhost:8082/api/analytics/top-students');
      const subject = await axios.get('http://localhost:8082/api/analytics/subject-wise');
      setAnalytics(campus.data);
      setTopStudents(top.data);
      setSubjectWise(subject.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendAnnouncement = async () => {
    try {
      await axios.post(`http://localhost:8082/api/notify/announcement?message=${announcement}`);
      setMessage('Announcement sent to all students!');
      setAnnouncement('');
    } catch (err) {
      setMessage('Error sending announcement!');
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛡️ Admin Dashboard</h1>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>

      {analytics && (
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h3>👥 Total Students</h3>
            <p style={styles.statNumber}>{analytics.totalStudents}</p>
          </div>
          <div style={styles.statCard}>
            <h3>📋 Total Attendance Records</h3>
            <p style={styles.statNumber}>{analytics.totalAttendanceRecords}</p>
          </div>
          <div style={styles.statCard}>
            <h3>📊 Avg Attendance</h3>
            <p style={styles.statNumber}>{analytics.averageAttendance}</p>
          </div>
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>🏆 Top Students</h2>
          {Object.entries(topStudents).map(([email, count], i) => (
            <div key={i} style={styles.record}>
              <p>👤 {email}</p>
              <p>✅ Classes: {count}</p>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h2>📚 Subject-wise Attendance</h2>
          {Object.entries(subjectWise).map(([subject, count], i) => (
            <div key={i} style={styles.record}>
              <p>📖 {subject}: {count} records</p>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h2>📢 Send Announcement</h2>
          <input
            style={styles.input}
            placeholder="Type announcement..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
          <button style={styles.button} onClick={sendAnnouncement}>
            Send to All Students
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { color: '#9c27b0', margin: 0 },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' },
  statCard: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  statNumber: { fontSize: '36px', fontWeight: 'bold', color: '#9c27b0', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#ea4335', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  message: { color: 'green', marginTop: '10px' },
  record: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', marginTop: '10px' },
};

export default AdminDashboard;