import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Chart from "../../components/chart/Chart";
import M from "materialize-css";
import "./Dashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

let ws = null;
var massPopChart;
let start = Date.now() - 24 * 60 * 60 * 1000;
let stop = Date.now();
let startTime = 0;
let stopTime = 0;
var arr = [];
var labels = [];
var chartData = {
  type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: labels,
    datasets: [
      {
        label: "CO₂",
        fill: "origin",
        data: arr,
        borderWidth: 5,
        borderColor: "#0058FF",
        backgroundColor: "rgb(179, 206, 239, 0.3)",
        hoverBorderWidth: 5,
        hoverBorderColor: "#0058FF",
        lineTension: 0.1,
        pointRadius: 0,
        borderJoinStyle: "bevel",
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          display: false, //this will remove all the x-axis grid lines
        },
      ],
      yAxes: [
        {
          display: true, //this will remove all the x-axis grid lines
        },
      ],
    },
    title: {
      display: false,
      text: "",
      fontSize: 25,
      fontColor: "gold",
    },
    legend: {
      display: false,
      position: "bottom",
      labels: {
        fontColor: "#000",
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      },
    },
    tooltips: {
      enabled: true,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liveSensor: "connecting...",
      max: 0,
      min: 0,
      average: 0,
    };
  }

  componentDidMount() {
    let startOptions = {
      onSelect: function(date) {
        start =
          new Date(date).getTime() -
          new Date(date).getTimezoneOffset() * 60 * 1000 +
          startTime;
      },
    };
    var startPicker = document.querySelectorAll(".startPicker");
    M.Datepicker.init(startPicker, startOptions);

    let stopOptions = {
      onSelect: function(date) {
        stop =
          new Date(date).getTime() -
          new Date(date).getTimezoneOffset() * 60 * 1000 +
          stopTime;
      },
    };
    var stopPicker = document.querySelectorAll(".stopPicker");
    M.Datepicker.init(stopPicker, stopOptions);

    let startOptionsTime = {
      onSelect: function(hour, minute) {
        start = start - startTime;
        startTime = hour * 60 * 60 * 1000 + minute * 60 * 1000;
        start = start + startTime;
      },
      twelveHour: false,
    };
    var startTimePicker = document.querySelectorAll(".startTimePicker");
    M.Timepicker.init(startTimePicker, startOptionsTime);

    let stopOptionsTime = {
      onSelect: function(hour, minute) {
        stop = stop - stopTime;
        stopTime = hour * 60 * 60 * 1000 + minute * 60 * 1000;
        stop = stop + stopTime;
      },
      twelveHour: false,
    };
    var stopTimePicker = document.querySelectorAll(".stopTimePicker");
    M.Timepicker.init(stopTimePicker, stopOptionsTime);

    const { user } = this.props.auth;
    let context = this;
    ws = new WebSocket("ws://localhost:5000/?key=" + user.apiKey);

    //request historical
    ws.onopen = function() {
      let params = {
        start: start,
        stop: stop,
      };
      ws.send(JSON.stringify(params));
    };

    //get live and historical
    ws.onmessage = function(evt) {
      let data = JSON.parse(evt.data);

      if (data.historicalData) {
        let binMinute = 1;
        let binDuration = binMinute * 60 * 1000;
        let numberOfBins = (stop - start) / binDuration;
        let savedIndex = 0;
        let sum = 0;
        let validCount = 0;
        arr.length = 0;
        labels.length = 0;
        

        let max = 0;
        let min = 10000;
        for (let i = 0; i < numberOfBins; i++) {
          //runs 1440 times
          let tempBin = [];
          for (let j = savedIndex; j < data.historicalData.length; j++) {

            //get max
            if (max < data.historicalData[j].value) {
              max = data.historicalData[j].value;
            }
            //get min
            if (data.historicalData[j].value < min) {
              min = data.historicalData[j].value
            }

            if (
              data.historicalData[j].timestamp >
                start + (i + 1) * binDuration ||
              start + (i + 1) * binDuration < data.historicalData[0].timestamp
            ) {
              break;
            }
            tempBin.push(data.historicalData[j].value);
            savedIndex = j + 1;
          }

          let date = new Date(start + (i + 1) * binDuration)
            .toUTCString()
            .slice(0, 25);

          let avg = Math.trunc(tempBin.reduce((a, b) => a + b, 0) / tempBin.length);
          if (!avg) {
            avg = 0;
            date = date + " NO DATA";
          } else {
            sum = sum + avg
            validCount++
          }

          arr.push(avg);
          labels.push(date);
        }

        let average = 0
        if (sum!==0) {
          average = Math.trunc(sum/validCount)
        }

        context.setState({
          max: max,
          min: min,
          average: average
        });
        massPopChart.update();
      } else {
        context.setState({
          liveSensor: data,
        });
        console.log(data);
      }
    };
  }

  setChart(chart) {
    massPopChart = chart;
  }

  getData() {
    let params = {
      start: start,
      stop: stop,
    };
    //console.log(params);
    ws.send(JSON.stringify(params));
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    if (ws) {
      ws.close();
    }
    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <div className="row m20 mb0">
          <div className="col s8 m10 l8">
            <div className="card horizontal transparent mb0">
              <div className="card-image"></div>
              <div className="card-stacked">
                <div className="card-content">
                  <h6 className="mb0">Your dashboard</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="row m20">
            <div className="col s12 m4">
              <div className="card-panel dashboard-card">
                <h6 className="center-align mb20">Current CO₂ Level</h6>
                <CircularProgressbar
                  value={this.state.liveSensor}
                  maxValue={10000}
                  text={this.state.liveSensor}
                  styles={buildStyles({
                    textSize: "10px",
                    // Colors
                    pathColor: `rgba(0, 255, 69, ${100 / 100})`,
                    textColor: "#113031",
                    trailColor: `rgba(0, 255, 69, ${30 / 100})`,
                  })}
                  className="center-align"
                />
                <p className="center-align mt20">
                  Rating (Acceptable, Hazardous, etc)
                </p>
              </div>
            </div>
            <div className="col s3 m2 pr0">
              <div className="card-panel chart-side">
                <p className="chart-titles center-align">
                  <b>HIGHEST POINT</b>
                </p>
                <h5 className="center-align">{this.state.max}</h5>
                <p className="chart-titles center-align">
                  <b>LOWEST POINT</b>
                </p>
                <h5 className="center-align">{this.state.min}</h5>
                <p className="chart-titles center-align">
                  <b>AVERAGE</b>
                </p>
                <h5 className="center-align">{this.state.average}</h5>
              </div>
            </div>
            <div className="col s9 m6 pl0">
              <div className="card-panel dashboard-card2">
                <div className="ml20 mb20">
                  <p>
                    <b>CO₂ Levels Over Time</b>
                  </p>{" "}
                  <Chart data={chartData} setChart={this.setChart} />
                </div>
                <form className="ml20">
                  <p></p>
                  <div className="input-field dashboard-input col">
                    <input id="startDay" type="text" className="startPicker" />
                    <label for="startDay" className="picker pl0">
                      First day
                    </label>
                  </div>
                  <div className="input-field dashboard-input col">
                    <input id="stopDay" type="text" className="stopPicker" />
                    <label for="stopDay" className="picker pl0">
                      Last day
                    </label>
                  </div>
                  <div className="input-field col">
                    <input
                      id="startTime"
                      type="text"
                      className="startTimePicker"
                    />
                    <label for="startTime" className="picker pl0">
                      Start time
                    </label>
                  </div>
                  <div className="input-field col">
                    <input
                      id="stopTime"
                      type="text"
                      className="stopTimePicker"
                    />
                    <label for="stopTime" className="picker pl0">
                      End time
                    </label>
                  </div>
                </form>
                <button
                  className="green-btn btn-small ml30"
                  id="getData"
                  onClick={this.getData}
                >
                  Get Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
