import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/auth/login', {
        email, password
      });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'STUDENT') navigate('/student');
      else if (role === 'FACULTY') navigate('/faculty');
      else if (role === 'ADMIN') navigate('/admin');
    } catch (err) {
      setError('Invalid email or password!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 SmartCampus</h1>
        <h2 style={styles.subtitle}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>Login</button>
        <p style={styles.link}>
          Don't have an account?{' '}
          <span style={styles.linkText} onClick={() => navigate('/register')}>
            Register
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
  error: {
    color: 'red',
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

export default Login;