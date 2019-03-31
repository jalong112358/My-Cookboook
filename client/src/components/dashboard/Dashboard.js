import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getCurrentUser } from "../../actions/authActions";

import AccountSettings from "./account-settings/AccountSettings";
import MyRecipes from "./my-recipes/MyRecipes";
import "./Dashboard.css";

import Spinner from "../common/Spinner/Spinner";

class Dashboard extends Component {
  state = {
    page: 1
  };

  changePage = page => {
    this.setState({
      page: page
    });
  };

  onDeleteClick = e => {
    this.props.deleteAccount();
  };
  render() {
    let dashboardContent;
    let editProfileLinkClasses = "";
    let accountSettingsLinkClasses = "";
    let myRecipesLinkClasses = "";

    switch (this.state.page) {
      case 1:
        dashboardContent = <AccountSettings />;
        accountSettingsLinkClasses = "active";
        break;
      case 2:
        dashboardContent = <MyRecipes />;
        myRecipesLinkClasses = "active";
        break;
      default:
        dashboardContent = null;
    }

    console.log(this.state.page);
    return (
      <div className="dashboard">
        <div className="dashboard-nav">
          <ul>
            <li>
              <span
                className={accountSettingsLinkClasses}
                onClick={this.changePage.bind(this, 1)}
              >
                <i class="fas fa-tools" /> Account Settings
              </span>
            </li>
            <li>
              <span
                className={myRecipesLinkClasses}
                onClick={this.changePage.bind(this, 2)}
              >
                <i class="fas fa-book-open" />
                My Recipes
              </span>
            </li>
          </ul>
        </div>
        <div className="dashboard-content">{dashboardContent}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getCurrentUser }
)(Dashboard);
