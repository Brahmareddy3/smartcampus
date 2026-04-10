import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'STUDENT'
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8082/api/auth/register', form);
      setMessage('Registered successfully! Please login.');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage('Email already exists!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 SmartCampus</h1>
        <h2 style={styles.subtitle}>Register</h2>
        {message && <p style={styles.message}>{message}</p>}
        <input
          style={styles.input}
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <select
          style={styles.input}
          value={form.role}
          onChange={(e) => setForm({...form, role: e.target.value})}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button style={styles.button} onClick={handleRegister}>Register</button>
        <p style={styles.link}>
          Already have account?{' '}
          <span style={styles.linkText} onClick={() => navigate('/')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '380px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: {
    textAlign: 'center',
    color: '#1a73e8',
    margin: 0,
  },
  subtitle: {
    textAlign: 'center',
    color: '#333',
    margin: 0,
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  message: {
    color: 'green',
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: '#666',
  },
  linkText: {
    color: '#1a73e8',
    cursor: 'pointer',
  },
};

export default Register;