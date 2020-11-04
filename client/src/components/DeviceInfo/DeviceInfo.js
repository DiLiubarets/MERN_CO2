import React, { Component } from "react";
import Slider from "../Slider/Slider";
import Stripe from "../Stripe/Stripe";
import ModuleDisplay from "../about/ModuleDisplay";
import DevelopmentBoard from "../about/DevelopmentBoard";
import Sensor from "../about/Sensor";
import "./DeviceInfo.css";


class DeviceInfo extends Component {
  render() {
    const deviceItems = [
      {
        title: "Fully Built Device",
        id: 1,
        Component: Stripe,
      },
      {
        title: "Module Display",
        id: 2,
        Component: ModuleDisplay,
      },
      {
        title: "Sensor",
        id: 3,
        Component: Sensor,
      },
      {
        title: "Development Board",
        id: 4,
        Component: DevelopmentBoard,
      }
    ];

    return (
      <div>
        <div className="row">
          <div className="col s12 m10 l8 col-centered">
          <h1 className="center-align" style={{ fontSize: "40px" }}>Device Info</h1>
          <p className="center-align">If you're interested in using this open source application, you'll need to buy a premade device, or buy the parts separately. Here is how you can do that.</p>
          </div>
          </div>
          <div className="row" style={{ paddingBottom:"60px" }}>
            <Slider
              options={{
                // autoPlay: 4000,
                // pauseAutoPlayOnHover: true,
                wrapAround: false,
                fullscreen: false,
                adaptiveHeight: false,
              }}
            >
              {deviceItems.map(({ id, Component }) => (
                <div
                style={{
                  width: "22em",
                  height: "700px",
                  margin: "3em 2em 0 2em",
                  textAlign: "center",
                }}
                key={id}>
                  {/* Where the magic happens */}
                  {Component && <Component />}
                </div>
              ))}
            </Slider>
            </div>
          </div>
          
    );
  }
}

export default DeviceInfo;