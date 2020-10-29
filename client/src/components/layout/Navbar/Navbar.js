import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import LogOut from "../../auth/Logout";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar-style">
        <div class="nav-wrapper" >
          <NavLink
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
          </NavLink>
          <ul id="nav-mobile" class="right hide-on-med-and-down mr20">
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/settings">Settings</NavLink>
            </li>
            <li>
              <LogOut />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
