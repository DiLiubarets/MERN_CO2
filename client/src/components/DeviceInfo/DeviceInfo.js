import React, { Component } from "react";
import "./DeviceInfo.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "../Stripe/Stripe";
import AboutProject from "../about/AboutProject";

class DeviceInfo extends Component {
  render() {
    const promise = loadStripe(
      "pk_test_51HfzDZHwLtaB4yxIao26UUOBQ30NgJs6rpsmIw8fTeSgjWxXXKiVkED7uQNbW4qlgAvUt7is4Ge1XVrt8ALmG9Em00RPO9CDC2"
    );
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered center-align">
            <Elements stripe={promise}>
              <Stripe />
            </Elements>
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



export default DeviceInfo;
