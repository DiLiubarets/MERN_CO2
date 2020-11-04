import React, { Component } from "react";
import ImgD from "../../images/DevelopmentBoard2.png";

class DevelopmentBoard extends Component {
  render() {
    return (
      <div>
          <div className="col s12 m7">
            <div className="card component-card">
              <div className="card-image">
                <img
                  alt="SunFounder Module Display"
                  src={ImgD}
                  className="carousel-img"
                />
              </div>
              <div className="card-content">
                <h2 className="card-title">Development Board</h2>
                <p>
                  Development Board WiFi WLAN Wireless Module for ESP8266
                  NodeMCU ESP-12E Compatible with Arduino.
                </p>
              </div>
              <div className="card-action">
                <a className="btn-large green-btn" href="https://www.amazon.ca/gp/product/B07PR9T5R5/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1">
                  Buy on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default DevelopmentBoard;
