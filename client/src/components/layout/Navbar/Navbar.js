import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Row from "react-bootstrap/Row";
import "./Navbar.css";

class OurNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Brand href="/" className="my-0 py-0">
        <img
        src="./assets/logo.svg"
        width="200"
        height="100"
        className="d-inline-block align-top"
        alt="<MERN/> CO2 Tracker logo"
      />
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default OurNavbar;
