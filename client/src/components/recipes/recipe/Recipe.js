import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner/Spinner";
import { getRecipe, addLike, removeLike } from "../../../actions/recipeActions";
import RecipeRating from "./RecipeRating";
import CommentForm from "./comment/CommentForm";
import CommentFeed from "./comment/CommentFeed";

import "./Recipe.css";

class Recipe extends Component {
  state = {
    image: ""
  };
  componentDidMount() {
    this.props.getRecipe(this.props.match.params.id);
  }

  addLikeClick = id => {
    this.props.addLike(id);
  };

  unlikeClick = id => {
    this.props.removeLike(id);
  };

  render() {
    const { recipe, loading } = this.props.recipe;

    console.log(this.state.image);

    let ingredients;
    let directions;

    let recipeContent;

    if (recipe === null || loading || Object.keys(recipe).length === 0) {
      recipeContent = <Spinner />;
    } else {
      const filename = recipe.imageId;

      // axios.get(`/api/images/${filename}`).then(res => {
      //   this.setState({
      //     image: URL.createObjectURL(res.data)
      //   });
      // });

      ingredients = recipe.ingredients.map((ingredient, index) => (
        <div className="recipe-list-item">
          <div>{index + 1}</div>
          <span>{ingredient}</span>
        </div>
      ));

      directions = recipe.directions.map((direction, index) => (
        <div className="recipe-list-item">
          <div>{index + 1}</div>
          <span>{direction}</span>
        </div>
      ));
      recipeContent = (
        <div className="recipe-content">
          <div className="recipe-header">
            <div className="recipe-header-info">
              <h4 className="recipe-title">{recipe.title}</h4>
              <div className="recipe-rating">
                <RecipeRating ratings={recipe.ratings} />
                <Link className="reviews-link" to="comment-section">
                  <span>{recipe.comments.length} Reviews</span>
                </Link>
              </div>

              <p className="recipe-description">{recipe.description}</p>

              <Link className="user-link" to={`/profile/${recipe.userhandle}`}>
                By <span>{recipe.name}</span>
              </Link>
            </div>

            <img className="recipe-image" src={`/api/images/${filename}`} />
          </div>

          <div className="recipe-meta-data">
            <div>
              <p>
                <span>Prep: </span>
                {recipe.preptime} minutes
              </p>
              <i class="far fa-clock" />
            </div>
            <div>
              <p>
                <span>Cook: </span>
                {recipe.cooktime} minutes
              </p>
              <i class="far fa-clock" />
            </div>
            <div>
              <p>{recipe.servings} servings</p>
              <i class="fas fa-chart-pie" />
            </div>
            <div>
              <p>{recipe.calories} calories</p>
              <i class="fas fa-chart-bar" />
            </div>
          </div>

          <div className="ingredients">
            <div className="ingredients-header">
              <h2>Ingredients</h2>
            </div>
            {ingredients}

            <div className="directions">
              <div className="directions-header">
                <h2>Directions</h2>
              </div>
              {directions}
            </div>
            <div className="comment-section">
              <h3 style={{ marginBottom: "25px" }}>Leave a review</h3>
              <CommentForm recipeId={recipe._id} />

              <h3 style={{ marginBottom: "25px" }}>Reviews</h3>
              <CommentFeed recipeId={recipe._id} comments={recipe.comments} />
            </div>
          </div>
        </div>
      );
    }
    return <div className="recipe">{recipeContent}</div>;
  }
}

Recipe.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRecipe, addLike, removeLike }
)(Recipe);
