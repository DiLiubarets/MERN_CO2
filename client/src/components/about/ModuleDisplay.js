import React, { Component } from "react";
import ImgM from "../../images/ModuleDisplay.png";

class ModuleDisplay extends Component {
  render() {
    return (
      <div>
          <div className="col s12 m7">
            <div className="card component-card">
              <div className="card-image">
                <img
                  alt="SunFounder Module Display"
                  src={ImgM}
                  className="carousel-img"
                />
              </div>
              <div className="card-content">
                <h2 className="card-title">Module Display</h2>
                <p>
                  SunFounder IIC/I2C/TWI 1602 Serial LCD Module Display for R3
                  Mega 2560.
                </p>
              </div>
              <div className="card-action">
                <a
            className="btn-large green-btn" href="https://www.amazon.ca/gp/product/B019K5X53O/ref=ppx_yo_dt_b_asin_title_o01_s01?ie=UTF8&psc=1">
                  Buy on Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ModuleDisplay;
