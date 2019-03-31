import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../common/Spinner/Spinner";
import isEmpty from "../../validation/is-empty";
import Masonry from "react-masonry-component";
import imagesLoaded from "imagesloaded";

import RecipeFeed from "./RecipeFeed";
import { getRecipes, getRecipesChunk } from "../../actions/recipeActions";

import "./Recipes.css";

class Recipes extends Component {
  state = {
    loadedRecipes: [],
    page: 0,
    layoutComplete: false
  };
  componentDidMount() {
    this.loadChunk();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.recipe.search !== this.props.recipe.search) {
      this.loadChunk();
    }
  }

  loadChunk = () => {
    this.props.getRecipesChunk(0, this.props.recipe.search);

    this.setState({
      skip: this.state.skip + 16
    });
  };
  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    });
  };
  prevPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  };

  handleLayoutComplete = () => {
    this.setState({
      layoutComplete: true
    });
  };

  render() {
    const { loading, recipes } = this.props.recipe;
    console.log(this.state.page);
    let recipeContent;

    if (recipes === null || loading) {
      recipeContent = <Spinner />;
    } else {
      recipeContent = (
        <RecipeFeed
          className="recipe-feed"
          recipes={recipes}
          page={this.state.page}
        />
      );
    }
    return (
      <div className="recipes">
        <Masonry
          className="recipe-feed-wrapper"
          onImagesLoaded={this.handleImagesLoaded}
          updateOnEachImageLoad="true"
          // onLayoutComplete={recipeContent =>
          //   this.handleLayoutComplete(recipeContent)
          // }
        >
          {recipeContent}
        </Masonry>

        <button onClick={this.prevPage}>Prev Page</button>
        <button onClick={this.nextPage}>Next Page</button>
      </div>
    );
  }
}

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipes, getRecipesChunk }
)(Recipes);
