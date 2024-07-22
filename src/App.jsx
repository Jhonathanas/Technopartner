import "./App.css";
import Footbar from "./Components/Footbar";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Menu from "./Pages/Menu";
import { useState, useEffect } from "react";
function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(JSON.parse(savedToken));
    }
  }, []);

  const handleLoginSuccess = (tokenData) => {
    localStorage.setItem("token", JSON.stringify(tokenData));
    setToken(tokenData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <div className="min-h-screen flex flex-col">
      {token ? (
        <>
          <Navbar onLogOut={handleLogout} />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home token={token} />} />
            <Route path="/menu" element={<Menu token={token} />} />
          </Routes>
          <Footbar /> 
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/menu" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
