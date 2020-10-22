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
        src="https://raw.githubusercontent.com/DiLiubarets/MERN_CO2/b8d129be9d8e77992727595f3560f45096729dc9/client/src/components/layout/Navbar/assets/logo.svg"
        width="150"
        height="75"
        className="d-inline-block align-top m-4"
        alt="<MERN/> CO2 Tracker logo"
      />
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default OurNavbar;
