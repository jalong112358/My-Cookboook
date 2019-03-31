import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { getCurrentUser } from "../../actions/authActions";
import NavSearch from "./NavSearch";

import DrawerToggle from "./SideDrawer/DrawerToggle";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    dropDownOpen: false,
    searchBarOpen: false
  };

  dropDownToggle = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  };
  dropDownClose = () => {
    this.setState({
      dropDownOpen: false
    });
  };
  dropDownOpen = () => {
    this.setState({
      dropDownOpen: true
    });
  };
  toggleSearchBar = () => {
    this.setState({
      searchBarOpen: !this.state.searchBarOpen
    });
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;
    let firstName;
    if (isAuthenticated) {
      let nameArray = user.name.split(" ");
      firstName = nameArray[0];
    } else {
      firstName = "";
    }
    // Toggle the dropdown menu
    let dropDownClasses;

    if (this.state.dropDownOpen) {
      dropDownClasses = "account-dropdown open";
    } else {
      dropDownClasses = "account-dropdown";
    }

    // Toggle mobile searchbar
    let searchBarClasses;

    if (this.state.searchBarOpen) {
      searchBarClasses = "nav-search open";
    } else {
      searchBarClasses = "nav-search";
    }

    const authLinks = (
      <ul className="auth-links">
        <li className={dropDownClasses} onMouseLeave={this.dropDownClose}>
          <div
            className="account-dropdown-btn"
            onClick={this.dropDownToggle}
            onMouseEnter={this.dropDownOpen}
          >
            <i class="fas fa-user" />
            <i class="fas fa-sort-down" />

            <span>Hello, {firstName}!</span>
          </div>

          <ul>
            <li className="dropdown-item">
              <Link className="dropdown-link" to="/dashboard">
                <i class="fas fa-wrench" />
                Account Settings
              </Link>
            </li>
            <li className="dropdown-item">
              <a
                className="dropdown-link"
                href="#"
                onClick={this.onLogoutClick.bind(this)}
              >
                <i class="fas fa-sign-out-alt" />
                Logout
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create-recipe">
            <i class="fas fa-plus" />
            Add Recipe
          </Link>
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

    return (
      <header className="toolbar">
        <nav className="toolbar_nav">
          <div className="nav-content-left">
            <Link className="navbar-brand" to="/">
              RICIPES
            </Link>

            <NavSearch
              classes={searchBarClasses}
              toggleSearchBar={this.toggleSearchBar}
            />
          </div>

          {isAuthenticated ? authLinks : guestLinks}
          <div className="mobile-nav-icons">
            <div className="nav-search-toggle" onClick={this.toggleSearchBar}>
              <i class="fas fa-search fa-lg" />
            </div>
            <DrawerToggle click={this.props.drawerClickHandler} />
          </div>
        </nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getCurrentUser }
)(Navbar);
