import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div>
      <nav className="nav">
        <div className="headers">
          <div className="home">
            <Link to="/home">Home</Link>
          </div>
          <div className="auth">
            <Link to="/auth">Register</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
