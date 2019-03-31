import React, { Component } from "react";

class FeaturedItem extends Component {
  render() {
    const { recipe } = this.props;
    return (
      <div className="featured-item">
        <img src={`/api/images/${recipe.imageId}`} />
        <div className="info">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      </div>
    );
  }
}

export default FeaturedItem;
