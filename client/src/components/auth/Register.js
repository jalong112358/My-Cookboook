import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import "./Register.css";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <form noValidate onSubmit={this.onSubmit}>
          <h1 className="display-4 text-center">Sign Up</h1>
          <TextFieldGroup
            icon={<i class="fas fa-user" />}
            placeholder="Name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />

          <TextFieldGroup
            icon={<i class="fas fa-envelope" />}
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
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

          <TextFieldGroup
            icon={<i class="fas fa-unlock" />}
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />

          <button type="submit" className="form-submit-btn">
            Sign Up
          </button>

          <p>
            Already a member?{" "}
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
