import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addLike } from "../../../actions/recipeActions";
import RecipeRating from "../recipe/RecipeRating";

import "./RecipeItem.css";

class RecipeItem extends Component {
  state = {
    imageLoaded: false
  };

  onImageLoad = () => {
    this.setState({
      imageLoaded: true
    });
  };

  render() {
    const { recipe, auth } = this.props;
    const filename = recipe.imageId;

    let itemClasses = "recipe-item";

    if (this.state.imageLoaded) {
      itemClasses = "recipe-item show";
    }
    return (
      <div className={itemClasses}>
        <Link to={`/recipe/${recipe._id}`}>
          <img
            onLoad={this.onImageLoad}
            className="recipe-item-image"
            src={`/api/images/${filename}`}
          />
        </Link>

        <Link className="recipe-title" to={`/recipe/${recipe._id}`}>
          {recipe.title}
        </Link>

        <RecipeRating ratings={recipe.ratings} />

        <p className="recipe-description">{recipe.description}</p>

        <p className="user-link" to={`/profile/${recipe.userhandle}`}>
          By <span>{recipe.name}</span>
        </p>
      </div>
    );
  }
}

RecipeItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike }
)(RecipeItem);
