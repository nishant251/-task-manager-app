import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>📋 Task Manager</h1>
          <p>Sign in to manage your tasks efficiently</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="name">👤 Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(""); // Clear error when typing
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error when typing
              }}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
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

export default Login;
