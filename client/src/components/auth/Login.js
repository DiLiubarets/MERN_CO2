import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Row>
        <Col sm={8} className="mx-auto mt-5">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i>Back to
            home
          </Link>
          <h4>Log in below</h4>
          <p className="grey-text text-darken-1">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <Form noValidate onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label for="contact-name">Name</Form.Label>
              <Form.Control
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound,
                })}
              />
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </Form.Group>
            <Form.Group>
              <Form.Label for="contact-name">Name</Form.Label>
              <Form.Control
                placeholder="Password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </Form.Group>
            <Button type="submit" className="green-btn ml-0">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
