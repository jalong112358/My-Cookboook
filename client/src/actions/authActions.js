import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, GET_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login: Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Update user

export const updateUser = (userData, history) => dispatch => {
  dispatch(setUserLoading());
  axios
    .post("/api/users/update", userData)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Get current user
export const getCurrentUser = () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get("/api/users/current")
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: {}
      })
    );
};
// User Loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Delete auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
