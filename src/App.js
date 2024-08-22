import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Detail from "./pages/detail";
import Jobs from "./pages/jobs";
import Login from "./pages/login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isLoggedIn");
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/jobs"
            element={
              <PrivateRoute
                element={<Jobs onLogout={handleLogout} />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/detail/:id"
            element={
              <PrivateRoute
                element={<Detail />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
