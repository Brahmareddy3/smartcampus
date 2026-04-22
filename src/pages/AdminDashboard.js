import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [newTimetable, setNewTimetable] = useState({
    subject: '', facultyEmail: '', day: '',
    startTime: '', endTime: '', room: '',
    semester: '', branch: ''
  });
  const [notification, setNotification] = useState({
    recipientEmail: '', title: '', message: '', type: 'GENERAL'
  });
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
    fetchTimetable();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get('http://localhost:8082/api/dashboard/admin');
      setDashboard(res.data);
    } catch (err) { console.log(err); }
  };

  const fetchTimetable = async () => {
    try {
      const res = await axios.get('http://localhost:8082/api/timetable/all');
      setTimetable(res.data);
    } catch (err) { console.log(err); }
  };

  const addTimetable = async () => {
    try {
      await axios.post('http://localhost:8082/api/timetable/add', newTimetable);
      setMessage('Timetable added successfully!');
      fetchTimetable();
      setNewTimetable({
        subject: '', facultyEmail: '', day: '',
        startTime: '', endTime: '', room: '',
        semester: '', branch: ''
      });
    } catch (err) { setMessage('Error adding timetable!'); }
  };

  const sendNotification = async () => {
    try {
      await axios.post(
        `http://localhost:8082/api/notifications/send?recipientEmail=${notification.recipientEmail}&title=${notification.title}&message=${notification.message}&type=${notification.type}`
      );
      setMessage('Notification sent successfully!');
      setNotification({ recipientEmail: '', title: '', message: '', type: 'GENERAL' });
    } catch (err) { setMessage('Error sending notification!'); }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const tabs = ['dashboard', 'timetable', 'notifications'];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛡️ Admin Dashboard</h1>
        <button style={styles.logoutBtn} onClick={logout}>Logout</button>
      </div>

      {/* Stats Row */}
      {dashboard && (
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <h3>👥 Total Users</h3>
            <p style={styles.statNumber}>{dashboard.totalUsers}</p>
          </div>
          <div style={styles.statCard}>
            <h3>🎓 Students</h3>
            <p style={styles.statNumber}>{dashboard.totalStudents}</p>
          </div>
          <div style={styles.statCard}>
            <h3>👨‍🏫 Faculty</h3>
            <p style={styles.statNumber}>{dashboard.totalFaculty}</p>
          </div>
          <div style={styles.statCard}>
            <h3>📋 Attendance</h3>
            <p style={styles.statNumber}>{dashboard.totalAttendance}</p>
          </div>
          <div style={styles.statCard}>
            <h3>📝 Marks</h3>
            <p style={styles.statNumber}>{dashboard.totalMarks}</p>
          </div>
          <div style={styles.statCard}>
            <h3>💬 Feedback</h3>
            <p style={styles.statNumber}>{dashboard.totalFeedback}</p>
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
          <h2>👋 Welcome Admin!</h2>
          <p>Manage your campus from here. Use tabs above to navigate!</p>
        </div>
      )}

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div style={styles.grid}>
          <div style={styles.card}>
            <h2>➕ Add Timetable</h2>
            {['subject', 'facultyEmail', 'day', 'startTime', 'endTime', 'room', 'semester', 'branch'].map(field => (
              <input
                key={field}
                style={styles.input}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newTimetable[field]}
                onChange={(e) => setNewTimetable({
                  ...newTimetable, [field]: e.target.value
                })}
              />
            ))}
            <button style={styles.button} onClick={addTimetable}>
              Add Timetable
            </button>
            {message && <p style={styles.message}>{message}</p>}
          </div>
          <div style={styles.card}>
            <h2>📅 All Timetables</h2>
            {timetable.length === 0 ? (
              <p>No timetable found!</p>
            ) : (
              timetable.map((t, i) => (
                <div key={i} style={styles.record}>
                  <p>📚 {t.subject} | 👨‍🏫 {t.facultyEmail}</p>
                  <p>📅 {t.day} | ⏰ {t.startTime} - {t.endTime}</p>
                  <p>🏫 Room: {t.room} | Sem: {t.semester} | {t.branch}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div style={styles.card}>
          <h2>📢 Send Notification</h2>
          <input
            style={styles.input}
            placeholder="Recipient Email"
            value={notification.recipientEmail}
            onChange={(e) => setNotification({
              ...notification, recipientEmail: e.target.value
            })}
          />
          <input
            style={styles.input}
            placeholder="Title"
            value={notification.title}
            onChange={(e) => setNotification({
              ...notification, title: e.target.value
            })}
          />
          <input
            style={styles.input}
            placeholder="Message"
            value={notification.message}
            onChange={(e) => setNotification({
              ...notification, message: e.target.value
            })}
          />
          <select
            style={styles.input}
            value={notification.type}
            onChange={(e) => setNotification({
              ...notification, type: e.target.value
            })}
          >
            <option value="GENERAL">GENERAL</option>
            <option value="ATTENDANCE">ATTENDANCE</option>
            <option value="MARKS">MARKS</option>
          </select>
          <button style={styles.button} onClick={sendNotification}>
            Send Notification
          </button>
          {message && <p style={styles.message}>{message}</p>}
        </div>
      )}
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
  tabRow: { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' },
  tab: { padding: '8px 16px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' },
  activeTab: { padding: '8px 16px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginBottom: '10px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', marginBottom: '10px' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#ea4335', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  message: { color: 'green', marginTop: '10px' },
  record: { backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', marginTop: '10px' },
};

export default AdminDashboard;