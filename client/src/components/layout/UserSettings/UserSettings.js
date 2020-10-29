import React, { Component } from "react";
import { connect } from "react-redux";
// import { connect } from "react-redux";
// import { logoutUser } from "../../actions/authActions";
// import Chart from "../../components/chart/Chart";
// import M from "materialize-css";
// import "./Dashboard.css";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

class UserSettings extends Component {
    // componentDidMount() {
    //     const { user } = this.props.auth;
    // }

  render() {
    const user  = this.props.auth;

    return (
      <div>
        <p>
          {/* Your API key: {user.apiKey} */}
          Error message: Cannot read property 'apiKey' of undefined
        </p>
      </div>
    );
  }
}

export default UserSettings;
