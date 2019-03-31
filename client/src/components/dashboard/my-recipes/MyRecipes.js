import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserRecipes } from "../../../actions/recipeActions";
import Spinner from "../../common/Spinner/Spinner";
import MyRecipeItem from "./MyRecipeItem";
import "./MyRecipes.css";

class MyRecipes extends Component {
  componentDidMount() {
    this.props.getUserRecipes(this.props.auth.user.id);
  }
  render() {
    const { recipes, loading } = this.props.recipe;
    let recipeContent;
    if (recipes === null || loading) {
      recipeContent = <Spinner />;
    } else {
      recipeContent = recipes.map(recipe => <MyRecipeItem recipe={recipe} />);
    }
    return <div classname="my-recipes">{recipeContent}</div>;
  }
}

MyRecipes.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUserRecipes }
)(MyRecipes);
