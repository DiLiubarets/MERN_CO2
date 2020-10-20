import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import "./Landing.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Landing extends Component {
  render() {
    return (
      <Row>
      <Col sm={8} className="mx-auto">
      <Jumbotron className="transparent">
        {/* <p className="hero-text text-center">
          Full-stack app with user authentication via passport and JWTs
        </p>
        <div>
          <Link
            to="/register"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
            className="btn btn-large"
          >
            Register
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            style={{
              width: "140px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
            }}
            className="btn btn-large btn-flat"
          >
            Log In
          </Link>
        </div> */}
        <h1 className="text-center">
          Full-stack app with user authentication via passport and JWTs
        </h1>
        <p className="text-center">
          Our application allows users to understand the quality of the air
          around them through the power of IoT. See what CO2 levels are right
          now, in the past, and compare your stored data over time to make
          informed decisions for your needs.
        </p>
        <p className="text-center">
          <Button size="lg" className="our-buttons" href="/login">Log In</Button>
          <Button size="lg" className="our-buttons" href="/register">Register</Button>
        </p>
      </Jumbotron>
      </Col>
      </Row>
    );
  }
}

export default Landing;
