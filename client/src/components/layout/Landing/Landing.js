import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Landing.css";
import Stripe from "../../Stripe/Stripe";
import AboutProject from "../../about/AboutProject";

class Landing extends Component {
  render() {
    const promise = loadStripe(
      "pk_test_51HfzDZHwLtaB4yxIao26UUOBQ30NgJs6rpsmIw8fTeSgjWxXXKiVkED7uQNbW4qlgAvUt7is4Ge1XVrt8ALmG9Em00RPO9CDC2"
    );
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <div className="card transparent center">
              <div className="card-content landing-style">
                <div className="card-title">
                  <h2>Get to know the CO₂ around you</h2>
                </div>
                <p>
                  Our application allows users to understand the quality of the
                  air around them through the power of the IoT. See what CO₂
                  levels are right now, in the past, and compare your stored
                  data over time to make informed decisions for your needs.
                </p>
                <div className="card-action center">
                  <Link to="/login">
                    <button className="btn-large green-btn">Log In</button>
                  </Link>
                  <Link to="/register">
                    <button className="btn-large green-btn">Register</button>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="row">
            <div className="col s12 m10 l8 col-centered center-align">
              <h6 class="center-align">Money</h6>
              <Elements stripe={promise}>
                <Stripe />
              </Elements>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="card-panel dashboard-card">
              <AboutProject />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
