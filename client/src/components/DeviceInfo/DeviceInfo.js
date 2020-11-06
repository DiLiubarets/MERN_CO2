import React, { Component } from "react";
import Stripe from "../Stripe/Stripe";
import ModuleDisplay from "../about/ModuleDisplay";
import DevelopmentBoard from "../about/DevelopmentBoard";
import Sensor from "../about/Sensor";
import "./DeviceInfo.css";

class DeviceInfo extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <h1 className="center-align" style={{ fontSize: "40px" }}>
              Device Info
            </h1>
            <p className="center-align">
              If you're interested in using this open source application, you'll
              need to buy a premade device, or buy the parts separately. Here is
              how you can do that.
            </p>
          </div>
        </div>
        <hr className="breaker" />
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
            <div className="row">
              <Stripe />
            </div>
            <hr className="breaker" />
            <div className="row">
              <ModuleDisplay />
            </div>
            <hr className="breaker" />
            <div className="row">
              <DevelopmentBoard />
            </div>
            <hr className="breaker" />
            <div className="row">
              <Sensor />
            </div>
            <hr className="breaker" />
          </div>
        </div>
      </div>
    );
  }
}

export default DeviceInfo;
