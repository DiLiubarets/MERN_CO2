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
            <h1 className="text-center my-4">Get to know the CO2 around you</h1>
            <p className="text-center">
              Our application allows users to understand the quality of the air
              around them through the power of IoT. See what CO2 levels are
              right now, in the past, and compare your stored data over time to
              make informed decisions for your needs.
            </p>
            <p className="text-center">
              <Link to="/login">
                <Button size="lg" className="green-btn">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" className="green-btn">
                  Register
                </Button>
              </Link>
            </p>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}

export default Landing;
