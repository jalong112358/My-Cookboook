import React, { Component } from "react";

export default class MyRecipeItem extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="my-recipe-item">
        <img src={`/api/images/${recipe.imageId}`} />
        <div className="my-recipe-info">
          <h4>{recipe.title}</h4>
          <p>{recipe.description}</p>
        </div>
      </div>
    );
  }
}
