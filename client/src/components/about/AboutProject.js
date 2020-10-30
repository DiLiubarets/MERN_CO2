import React, { Component } from "react";
import ImgD from "../../images/DevelopmentBoard .jpg";
import ImgM from "../../images/ModuleDisplay.jpg";
import ImgS from "../../images/Sensor.jpg";

class AboutProject extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m10 l8 col-centered">
          <div className="card transparent">
            <div className="card-content landing-style">
              <div className="card-title center">
                <h4>Components what been used to build the device </h4>
              </div>
              <p>
                <h6>
                  SunFounder IIC/I2C/TWI 1602 Serial LCD Module Display for R3
                  Mega 2560.
                  <a href="https://www.amazon.ca/gp/product/B019K5X53O/ref=ppx_yo_dt_b_asin_title_o01_s01?ie=UTF8&psc=1">
                    Link to order{" "}
                  </a>
                </h6>
                <img
                  style={{
                    width: "100px",
                  }}
                  src={ImgM}
                  alt=""
                />
              </p>
              <p>
                <h6>
                  K30 CO₂ Carbon Dioxide Sensor{" "}
                  <a href="https://www.ebay.com/itm/1pc-senseair-K30-CO2-Carbon-dioxide-sensor-F4641-CY/153411264694?hash=item23b80620b6:g:N6sAAOSwzRlaLfwf">
                    {" "}
                    Link to order{" "}
                  </a>
                </h6>{" "}
                <img
                  style={{
                    width: "100px",
                  }}
                  src={ImgS}
                  alt=""
                />
              </p>

              <p>
                <h6>
                  Development Board WiFi WLAN Wireless Module for ESP8266
                  NodeMCU ESP-12E Compatible with Arduino.
                  <a href="https://www.amazon.ca/gp/product/B07PR9T5R5/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1">
                    Link to order{" "}
                  </a>
                </h6>
                <img
                  style={{
                    width: "100px",
                  }}
                  src={ImgD}
                  alt=""
                />
              </p>
              <p>
                <h6>Code for Arduino coming soon</h6>
                <code></code>
              </p>
              {/* <p>
                <a href="">Link for 3d printer </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutProject;
