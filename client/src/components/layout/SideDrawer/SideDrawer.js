import React, { Component } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { clearCurrentProfile } from "../../../actions/profileActions";

import "./SideDrawer.css";

class SideDrawer extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="auth-links">
        <li className="nav-item">
          <Link className="nav-link" to="/create-recipe">
            <i class="fas fa-plus" />
            Add Recipe
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i class="fas fa-user" /> My Account
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="logout"
            href="#"
            onClick={this.onLogoutClick.bind(this)}
          >
            <i class="fas fa-sign-out-alt" />
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="guest-links">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            <i class="fas fa-user-plus" />
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            <i class="fas fa-sign-in-alt" /> Login
          </Link>
        </li>
      </ul>
    );

    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    return (
      <nav className={drawerClasses}>
        <Link className="navbar-brand" to="/">
          RICIPES
        </Link>

        <ul>
          <li>
            <Link className="nav-link" to="/recipes">
              Recipes
            </Link>
          </li>
        </ul>

        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

SideDrawer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(SideDrawer);
