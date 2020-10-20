import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import "./Navbar.css";

class OurNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Brand href="/" className="my-0 py-0">
            {`<MERN />`}
            CO2 Tracker
            {/* This will be an image at some point */}
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default OurNavbar;
