import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Chart from "../../components/chart/Chart";
import M from "materialize-css";

let ws = null;
var massPopChart;
let start = Date.now() - 24 * 60 * 60 * 1000;
let stop = Date.now();
var arr = [];
var labels = [];
var chartData = {
  type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: labels,
    datasets: [
      {
        label: "CO₂",
        fill: false,
        data: arr,
        borderWidth: 1,
        borderColor: "green",
        backgroundColor: "green",
        hoverBorderWidth: 7,
        hoverBorderColor: "red",
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
    },
    title: {
      display: true,
      text: "",
      fontSize: 25,
      fontColor: "gold",
    },
    legend: {
      display: true,
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
    };
  }

  componentDidMount() {
    let startOptions = {
      onSelect: function(date) {
        start = new Date(date).getTime();
      },
    };
    var startPicker = document.querySelectorAll(".startPicker");
    M.Datepicker.init(startPicker, startOptions);

    let stopOptions = {
      onSelect: function(date) {
        stop = new Date(date).getTime();
      },
    };
    var stopPicker = document.querySelectorAll(".stopPicker");
    M.Datepicker.init(stopPicker, stopOptions);

  
    var stopTimePicker = document.querySelectorAll('.stopTimePicker');
    M.Timepicker.init(stopTimePicker);
    var startTimePicker = document.querySelectorAll('.startTimePicker');
    M.Timepicker.init(startTimePicker);

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
        arr.length = 0;
        labels.length = 0;

        for (let i = 0; i < numberOfBins; i++) {
          //runs 1440 times
          let tempBin = [];
          for (let j = savedIndex; j < data.historicalData.length; j++) {
            if (
              data.historicalData[j].timestamp >
              start + (i + 1) * binDuration
            ) {
              ///cheaking if greater than startime + binduration*
              //console.log("break")
              break;
            }
            tempBin.push(data.historicalData[j].value);
            savedIndex = j + 1;
          }

          let avg = tempBin.reduce((a, b) => a + b, 0) / tempBin.length;
          let date = new Date(start + (i + 1) * binDuration)
            .toUTCString()
            .slice(0, 25);

          if (!avg) {
            avg = 0;
            date = date + " NO DATA";
          }

          arr.push(avg);
          labels.push(date);
        }
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
    console.log(params);
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
    const { user } = this.props.auth;

    return (
      <div style={{ height: "75vh" }} className="container align-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
              <p>CO₂: {this.state.liveSensor} ppm</p>
            </h4>
            <p> Your API key: {user.apiKey}</p>
            <div className="row">
              <form className="col s12">
                <div class="row">
                  <div className="input-field  col s4">
                    <label for="startDay">Start day</label>
                    <input id="startDay" type="text" class="startPicker" />
                    </div>
                    <div class="input-field  col s4">
                      <label for="stopDay">Stop day</label>
                      <input id="stopDay" type="text" class="stopPicker" />
                    </div>    
                  </div>
                  <div class="row">
                    <div class="input-field col s4">
                      <label for="startTime">Start time</label>
                      <input id="startTime" type="text" class="startTimePicker" />
                    </div>
                    <div class="input-field col s4">
                      <label for="stopTime">Stop time</label>
                      <input id="stopTime" type="text" class="stopTimePicker" />
                    </div>
                  </div>
                  
              
              </form>
              <div class="col s4">
                    <a
                      class="waves-effect waves-light btn"
                      id="getData"
                      onClick={this.getData}
                    >
                      Get Data
                    </a>
                  </div>
            </div>

            <div>
              <Chart data={chartData} setChart={this.setChart} />
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
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
