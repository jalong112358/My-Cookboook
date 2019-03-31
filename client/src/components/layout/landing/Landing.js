import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner/Spinner";
import FeaturedRecipes from "./FeaturedRecipes";
import { getFeaturedRecipes } from "../../../actions/recipeActions";
import Recipes from "../../recipes/Recipes";
import "./Landing.css";

import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    this.props.getFeaturedRecipes();
  }
  render() {
    const { recipes, loading } = this.props.recipe;
    let featuredRecipes;
    if (recipes === null || loading) {
      featuredRecipes = <Spinner />;
    } else {
      featuredRecipes = <FeaturedRecipes recipes={recipes} />;
    }
    return (
      <div className="landing">
        {featuredRecipes}
        <Recipes />
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getFeaturedRecipes }
)(Landing);
