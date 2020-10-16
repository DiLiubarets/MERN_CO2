import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Chart from "../../components/chart/Chart";

let ws = null;
var massPopChart;
var arr = [];
var labels = [];
var chartData = {
  type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data: {
    labels: labels,
    datasets: [
      {
        label: "c02",
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
    const { user } = this.props.auth;
    let context = this;
    ws = new WebSocket("ws://localhost:5000/?key=" + user.apiKey);

    //request historical
    ws.onopen = function() {
      ws.send(Date.now() - 21600000);
    };

    //get live and historical
    ws.onmessage = function(evt) {
      let data = JSON.parse(evt.data);

      if (data.historicalData) {
        for (let entry of data.historicalData) {
          arr.push(entry.value);
          labels.push(entry.timestamp);
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
