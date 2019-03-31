import React, { Component } from "react";
import "./Comments.css";
class RateRecipe extends Component {
  state = {
    rating: null
  };

  changeRating = starValue => {
    this.setState(
      {
        rating: starValue
      },
      () => {
        this.updateParent();
      }
    );
  };

  updateParent = () => {
    this.props.parentUpdate(this.state.rating);
  };
  render() {
    let stars = [];

    if (this.state.rating === null) {
      for (let i = 0; i < 5; i++) {
        let starValue = i + 1;
        stars.push(
          <i
            onClick={this.changeRating.bind(this, starValue)}
            class="fas fa-star star-empty"
          />
        );
      }
    } else {
      for (let i = 0; i < this.state.rating; i++) {
        let starValue = i + 1;
        stars.push(
          <i
            onClick={this.changeRating.bind(this, starValue)}
            class="fas fa-star star-solid"
          />
        );
      }
      for (let i = 0; i < 5 - this.state.rating; i++) {
        let starValue = i + this.state.rating + 1;
        stars.push(
          <i
            onClick={this.changeRating.bind(this, starValue)}
            class="fas fa-star star-empty"
          />
        );
      }
    }

    return (
      <div className="rate-recipe">
        {stars}
        <span className="form-error">{this.props.error}</span>
      </div>
    );
  }
}

export default RateRecipe;
