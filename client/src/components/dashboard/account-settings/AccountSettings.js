import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";

import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";

import { updateUser, getCurrentUser } from "../../../actions/authActions";
import isEmpty from "../../../validation/is-empty";

import Spinner from "../../common/Spinner/Spinner";

class AccountSettings extends Component {
  state = {
    name: "",
    email: "",
    errors: {}
  };
  componentDidMount() {
    this.props.getCurrentUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.user !== this.props.auth.user) {
      this.setState({
        email: this.props.auth.user.email,
        name: this.props.auth.user.name
      });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    // if (nextProps.profile.profile) {
    //   const profile = nextProps.profile.profile;
    //   this.setState({
    //     handle: profile.handle,
    //     bio: profile.bio
    //   });
    // }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      name: this.state.name,

      email: this.state.email
    };

    this.props.updateUser(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { user, loading } = this.props.auth;

    let userContent;

    if (user === null || loading) {
      userContent = <Spinner />;
    } else {
      userContent = (
        <div>
          <h1 className="col-md-4 text-center">Account Settings</h1>
          <p className="lead text-center">Please enter your information</p>

          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="First and last name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />

            <TextAreaFieldGroup
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />

            <input type="submit" value="Save" className="form-submit-btn" />
          </form>
        </div>
      );
    }

    return <div className="account-settings">{userContent}</div>;
  }
}

AccountSettings.propTypes = {
  updateUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,

  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUser, getCurrentUser }
)(withRouter(AccountSettings));
