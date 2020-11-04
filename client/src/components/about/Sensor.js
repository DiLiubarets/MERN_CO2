import React, { Component } from "react";
import ImgS from "../../images/Sensor.png";

class Sensor extends Component {
  render() {
    return (
      <div>
          <div className="col s12 m7">
            <div className="card component-card">
              <div className="card-image">
                <img
                  alt="SunFounder Module Display"
                  src={ImgS}
                  className="carousel-img"
                />
              </div>
              <div className="card-content">
              <h2 className="card-title">
                  Sensor
                </h2>
                <p>
                K30 CO₂ Carbon Dioxide Sensor
                </p>
              </div>
              <div className="card-action">
                <a
            className="btn-large green-btn" href="https://www.ebay.com/itm/1pc-senseair-K30-CO2-Carbon-dioxide-sensor-F4641-CY/153411264694?hash=item23b80620b6:g:N6sAAOSwzRlaLfwf">
                  Buy on eBay
                </a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Sensor;
