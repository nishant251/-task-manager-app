import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SimpleLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Generate unique user ID
    const userId = "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    
    // Store user info in sessionStorage
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to task manager
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>
            <span style={{ color: '#FF6B6B' }}>📋</span>{' '}
            <span style={{ color: '#4ECDC4' }}>Task</span>{' '}
            <span style={{ color: '#45B7D1' }}>Manager</span>
          </h1>
          <p style={{ color: '#666' }}>
            <span style={{ color: '#FF6B6B' }}>Sign in</span>{' '}
            <span style={{ color: '#4ECDC4' }}>to</span>{' '}
            <span style={{ color: '#45B7D1' }}>manage</span>{' '}
            <span style={{ color: '#96CEB4' }}>your tasks efficiently</span>
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="name">👤 Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔒 Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            🚀 Sign In
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            <small>
              Any name and password will work • No authentication required
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SimpleLogin;
