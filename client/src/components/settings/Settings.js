import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { logoutUser } from "../../actions/authActions";

let context;
// import Chart from "../../components/chart/Chart";
// import M from "materialize-css";
// import "./Dashboard.css";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    context = this;
    this.state = {
      user: this.props.auth.user,
    };
  }

  requestNewKey() {
    axios
      .post("/api/users/newKey", {
        apiKey: context.props.auth.user.apiKey,
      })
      .then(function(response) {
        context.props.auth.user.apiKey = response.data;
        context.setState({
          user: context.props.auth.user,
        });
        //user.apiKey = response.data
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="row m20 mb0">
          <div className="col s8 m10 l8">
            <div className="card horizontal transparent mb0">
              <div className="card-stacked">
                <div className="card-content">
                  <h6 className="mb0">Your settings</h6>
                  <h6>Your user name: {this.state.user.name}</h6>
                  <h6>Your email: {this.state.user.userEmail}</h6>
                  <h6>Your API key: {this.state.user.apiKey} </h6>
                  <button
                    className="green-btn btn-small ml30"
                    onClick={this.requestNewKey}
                  >
                    Request new API key
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
