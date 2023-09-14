import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '1rem'
  }
  return (
    
    <div>
      <nav className="nav">
        <div className="headers">
          <div className="home">
            <Link to="/home" style={linkStyle}>Home</Link>
          </div>
          <div className="auth">
            <Link to="/auth" style={linkStyle}>Register</Link>
          </div>
        </div>
      </nav>
    </div>
    
  );
};

export default Navbar;
