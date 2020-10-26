import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m10 l8 col-centered">
          <div className="card transparent center">
          <div className="card-content landing-style">
            <div className="card-title"><h2>Get to know the CO2 around you</h2></div>
            <p>
              Our application allows users to understand the quality of the air
              around them through the power of the IoT. See what CO2 levels are
              right now, in the past, and compare your stored data over time to
              make informed decisions for your needs.
            </p>
            <div className="card-action center">
              <Link to="/login">
                <button className="btn-large green-btn">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className="btn-large green-btn">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Landing;
