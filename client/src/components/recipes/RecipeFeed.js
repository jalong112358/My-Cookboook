import React, { Component } from "react";
import PropTypes from "prop-types";
import RecipeItem from "./recipe-item/RecipeItem";

class RecipeFeed extends Component {
  state = {
    slice: []
  };

  render() {
    const { recipes, page } = this.props;

    let sliceStart = page * 16;
    let slice = recipes.slice(sliceStart, sliceStart + 16);

    return slice.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} />);
  }
}

RecipeFeed.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeFeed;
