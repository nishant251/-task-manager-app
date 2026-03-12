import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SimpleLogin from "./pages/SimpleLogin";
import App from "./App";
import "./App.css";

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkLogin = () => {
      const loggedIn = sessionStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
    };
    
    checkLogin();
    
    // Check every second for login changes
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? 
                <App /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route path="/login" element={<SimpleLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
