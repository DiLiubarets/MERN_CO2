import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// import Chart from "../../components/chart/Chart";
// import M from "materialize-css";
// import "./Dashboard.css";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

class Settings extends Component {

  render() {
    const {user}  = this.props.auth;

    return (
      <div>
        <p>
          {user.apiKey}
        </p>
      </div>
    );
  }
}

Settings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Settings);

