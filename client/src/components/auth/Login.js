import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",

    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.onSubmit}>
          <h1 className="login-header">Log In</h1>
          <TextFieldGroup
            icon={<i class=" fas fa-user" />}
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          <TextFieldGroup
            icon={<i class="fas fa-unlock" />}
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />

          <button type="submit" className="form-submit-btn">
            Login
          </button>

          <p>
            New User?{" "}
            <Link to="/register" className="register-link">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
