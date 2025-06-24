import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">Transformer Monitor</span>
      </div>

      <div className="navbar-center">
        <Link to="/dataentry" className={`nav-link ${location.pathname === "/dataentry" ? "active" : ""}`}>
          Data Entry
        </Link>
        <Link to="/dashboard" className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}>
          Dashboard
        </Link>
        <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
          About
        </Link>
      </div>

      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
