import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [qrToken, setQrToken] = useState('');
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'muttireddybrahmareddy@gmail.com';

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    fetchAttendance();
    fetchMarks();
    fetchNotifications();
    fetchTimetable();
    fetchDashboard();
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/attendance/student/${email}`);
      setAttendance(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchMarks = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/marks/student/${email}`);
      setMarks(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/notifications/${email}`);
      setNotifications(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchTimetable = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/timetable/all`);
      setTimetable(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/dashboard/student/${email}`);
      setDashboard(res.data);
    } catch (err) { console.log(err); }
  };

  const markAttendance = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8082/api/attendance/mark?studentEmail=${email}&qrToken=${qrToken}`
      );
      setMessage(res.data);
      fetchAttendance();
    } catch (err) { setMessage('Error marking attendance!'); }
  };

  const getPrediction = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/api/prediction/overall?studentEmail=${email}&totalClasses=30`
      );
      setPrediction(res.data);
    } catch (err) { console.log(err); }
  };

  const markNotificationRead = async (id) => {
    try {
      await axios.put(`http://localhost:8082/api/notifications/read/${id}`);
      fetchNotifications();
    } catch (err) { console.log(err); }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const tabs = ['dashboard', 'attendance', 'marks', 'timetable', 'notifications', 'prediction'];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🎓 Student Dashboard</h1>
        <div style={styles.headerRight}>
          <span style={styles.emailBadge}>👤 {email}</span>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {/* Stats Row */}
      {dashboard && (
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h3>📋 Attendance</h3>
            <p style={styles.statNumber}>{dashboard.totalAttendance}</p>
          </div>
          <div style={styles.statCard}>
            <h3>📚 Subjects</h3>
            <p style={styles.statNumber}>{dashboard.totalSubjects}</p>
          </div>
          <div style={styles.statCard}>
            <h3>🔔 Unread</h3>
            <p style={styles.statNumber}>{dashboard.unreadNotifications}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabRow}>
        {tabs.map(tab => (
          <button
            key={tab}
            style={activeTab === tab ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div style={styles.card}>
          <h2>👋 Welcome, {email}!</h2>
          <p>Use the tabs above to navigate your dashboard.</p>
        </div>
      )}

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
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
            <h2>📊 My Attendance Records</h2>
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
        </div>
      )}

      {/* Marks Tab */}
      {activeTab === 'marks' && (
        <div style={styles.card}>
          <h2>📝 My Marks</h2>
          {marks.length === 0 ? (
            <p>No marks records found!</p>
          ) : (
            marks.map((m, i) => (
              <div key={i} style={styles.record}>
                <p>📚 Subject: {m.subject}</p>
                <p>📝 Internal: {m.internalMarks} | Assignment: {m.assignmentMarks} | Exam: {m.examMarks}</p>
                <p>🏆 Grade: <strong>{m.grade}</strong> | Semester: {m.semester}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div style={styles.card}>
          <h2>📅 My Timetable</h2>
          {timetable.length === 0 ? (
            <p>No timetable found!</p>
          ) : (
            timetable.map((t, i) => (
              <div key={i} style={styles.record}>
                <p>📚 {t.subject} | 👨‍🏫 {t.facultyEmail}</p>
                <p>📅 {t.day} | ⏰ {t.startTime} - {t.endTime} | 🏫 Room: {t.room}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div style={styles.card}>
          <h2>🔔 My Notifications</h2>
          {notifications.length === 0 ? (
            <p>No notifications!</p>
          ) : (
            notifications.map((n, i) => (
              <div key={i} style={{
                ...styles.record,
                backgroundColor: n.read ? '#f8f9fa' : '#e8f4fd'
              }}>
                <p><strong>{n.title}</strong> — {n.type}</p>
                <p>{n.message}</p>
                {!n.read && (
                  <button style={styles.smallBtn}
                    onClick={() => markNotificationRead(n.id)}>
                    Mark as Read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Prediction Tab */}
      {activeTab === 'prediction' && (
        <div style={styles.card}>
          <h2>🤖 AI Performance Prediction</h2>
          <button style={styles.button} onClick={getPrediction}>
            Get My Prediction
          </button>
          {prediction && (
            <div style={styles.prediction}>
              <p>📊 Overall Score: <strong>{prediction.overallScore}</strong></p>
              <p>🏆 Overall Grade: <strong>{prediction.overallGrade}</strong></p>
              <p>📚 Total Subjects: <strong>{prediction.totalSubjects}</strong></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  headerRight: { display: 'flex', gap: '10px', alignItems: 'center' },
  title: { color: '#1a73e8', margin: 0 },
  emailBadge: { backgroundColor: '#e8f4fd', padding: '6px 12px', borderRadius: '20px', fontSize: '14px' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' },
  statCard: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  statNumber: { fontSize: '36px', fontWeight: 'bold', color: '#1a73e8', margin: 0 },
  tabRow: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  tab: { padding: '8px 16px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' },
  activeTab: { padding: '8px 16px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', marginBottom: '10px' },
  smallBtn: { padding: '4px 10px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#ea4335', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  message: { color: 'green', marginTop: '10px' },
  record: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', marginTop: '10px' },
  prediction: { backgroundColor: '#e8f4fd', padding: '15px', borderRadius: '8px', marginTop: '10px' },
};

export default StudentDashboard;