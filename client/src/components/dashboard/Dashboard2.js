import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
import Chart from "../../components/chart/Chart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Dashboard2 extends Component {
  render() {
    return (
        <div className="m-5">
      <Row>
        <Col sm={2}>
        <span role="img" style={{ fontSize: "100px" }}>&#128075;</span>
        </Col>
        <Col sm={true} className="ml-5 my-auto">
          <h5>HI FIRSTNAME,</h5>
          <h1>Welcome Back!</h1>
        </Col>
        </Row>
        <Row>
        {/* <p>CO₂: {this.state.liveSensor} ppm</p>
            <p> Your API key: {user.apiKey}</p> */}
        <p>CO₂: 400 ppm</p>
        <p> Your API key: lsdkfjsdlkfjs</p>
        <div>{/* <Chart data={chartData} setChart={this.setChart} /> */}</div>
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
        </Row>
        </div>
    );
  }
}

export default Dashboard2;
