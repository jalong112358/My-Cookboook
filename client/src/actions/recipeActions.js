import axios from "axios";

import {
  GET_ERRORS,
  ADD_RECIPE,
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_LOADING,
  DELETE_RECIPE,
  ADD_SEARCH
} from "./types";

// Get all recipes
export const getRecipes = () => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get("/api/recipes")
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPES,
        payload: null
      })
    );
};

// Get recipe
export const getRecipe = id => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get(`/api/recipes/${id}`)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPE,
        payload: null
      })
    );
};

// Add search

export const addSearch = search => {
  return {
    type: ADD_SEARCH,
    payload: search
  };
};

// Get featured recipes
export const getFeaturedRecipes = () => dispatch => {
  axios
    .get("/api/recipes/featured")
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPES,
        payload: null
      })
    );
};

// Get user recipes
export const getUserRecipes = userId => dispatch => {
  dispatch(setRecipeLoading());
  axios
    .get(`/api/recipes/${userId}`)
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPES,
        payload: null
      })
    );
};

// Get recipes in chunk
export const getRecipesChunk = (skip, search) => dispatch => {
  console.log(search);
  dispatch(setRecipeLoading());
  axios
    .get("/api/recipes/chunk", { params: { skip: skip, search: search } })
    .then(res =>
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_RECIPES,
        payload: null
      })
    );
};
// Create a new recipe
export const createRecipe = recipeData => dispatch => {
  axios
    .post("/api/recipes", recipeData)
    .then(res =>
      dispatch({
        type: ADD_RECIPE,
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

// Delete recipe
export const deleteRecipe = id => dispatch => {
  axios
    .delete(`/api/recipes/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_RECIPE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// like
export const addLike = id => dispatch => {
  axios
    .post(`/api/recipes/like/${id}`)
    .then(res => dispatch(getRecipes()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// unlike
export const removeLike = id => dispatch => {
  axios
    .post(`/api/recipes/unlike/${id}`)
    .then(res => dispatch(getRecipes()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add comment
export const addComment = (recipeId, commentData) => dispatch => {
  axios
    .post(`/api/recipes/comment/${recipeId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
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
// Delete Comment
export const deleteComment = (recipeId, commentId) => dispatch => {
  axios
    .delete(`/api/recipes/comment/${recipeId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_RECIPE,
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

// Profile Loading
export const setRecipeLoading = () => {
  return {
    type: RECIPE_LOADING
  };
};
