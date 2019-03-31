import {
  ADD_RECIPE,
  GET_RECIPE,
  GET_RECIPES,
  DELETE_RECIPE,
  RECIPE_LOADING,
  ADD_SEARCH
} from "../actions/types";

const initialState = {
  recipe: {},
  recipes: [],
  loading: false,
  search: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECIPE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes]
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload)
      };
    case ADD_SEARCH:
      return {
        ...state,
        search: action.payload
      };

    default:
      return state;
  }
}
