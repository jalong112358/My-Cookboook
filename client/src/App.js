import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import SideDrawer from "./components/layout/SideDrawer/SideDrawer";
import Backdrop from "./components/layout/Backdrop/Backdrop";
import Footer from "./components/layout/footer/Footer";
import Landing from "./components/layout/landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import Recipes from "./components/recipes/Recipes";
import CreateRecipe from "./components/recipes/create-recipe/CreateRecipe";
import Recipe from "./components/recipes/recipe/Recipe";
import Profile from "./components/profile/Profile";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDraweropen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar drawerClickHandler={this.drawerToggleHandler} />
            <SideDrawer show={this.state.sideDrawerOpen} />
            <Backdrop
              click={this.backdropClickHandler}
              show={this.state.sideDrawerOpen}
            />
            <main>
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/recipes" component={Recipes} />

                <Route exact path="/recipe/:id" component={Recipe} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>

                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-recipe"
                    component={CreateRecipe}
                  />
                </Switch>
              </div>
            </main>

            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
