import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar-style">
        <div class="nav-wrapper">
          <Link
            to="/"
            style={{
              fontFamily: "monospace",
            }}
            className="brand-logo left"
          >
            <img
              src="https://raw.githubusercontent.com/DiLiubarets/MERN_CO2/b8d129be9d8e77992727595f3560f45096729dc9/client/src/components/layout/Navbar/assets/logo.svg"
              width="150"
              height="75"
              className="d-inline-block align-top m-4"
              alt="<MERN/> CO2 Tracker logo"
            />
          </Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down mr20">
            <li>
              <Link to="/login">Log In</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
