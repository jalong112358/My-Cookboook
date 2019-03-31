import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FeaturedItem from "./FeaturedItem";
import { connect } from "react-redux";

class FeaturedRecipes extends Component {
  render() {
    const { recipes } = this.props;

    const featuredRecipes = recipes.map(recipe => (
      <FeaturedItem key={recipe._id} recipe={recipe} />
    ));
    return <div className="featured-recipes">{featuredRecipes}</div>;
  }
}

FeaturedRecipes.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(FeaturedRecipes);
