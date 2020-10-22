import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Row>
        <Col xs={10} sm={8} className="mx-auto mt-5">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <h4>Register below</h4>
          <p className="grey-text text-darken-1">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          <Form noValidate onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="Full Name"
                name="Name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name,
                })}
                // onChange={this.onChange}
                // value={this.state.name}
                // error={errors.name}
                // id="name"
                // type="text"
                // className={classnames("", {
                //   invalid: errors.name
                // })}
              />
              <span className="red-text">{errors.name}</span>
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email,
                })}
              />
              <span className="red-text">{errors.email}</span>
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Choose a secure password"
                name="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password,
                })}
              />
              <span className="red-text">{errors.password}</span>
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="Confirm your password"
                name="password2"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2,
                })}
              />
              <span className="red-text">{errors.password2}</span>
            </Form.Group>
            <Button type="submit" className="green-btn ml-0">
              Sign up
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
