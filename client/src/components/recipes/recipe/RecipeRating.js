import React from "react";
import "./comment/Comments.css";

function RecipeRating(props) {
  const { ratings } = props;

  let stars = [];

  let ratingTotal = 0;
  for (var i = 0; i < ratings.length; i++) {
    ratingTotal += ratings[i];
  }
  var ratingAvg = ratingTotal / ratings.length;

  for (let i = 0; i < ratingAvg; i++) {
    let starValue = i + 1;
    stars.push(<i class="fas fa-star star-solid display-only" />);
  }
  for (let i = 0; i < 5 - ratingAvg; i++) {
    let starValue = i + ratingAvg + 1;
    stars.push(<i class="fas fa-star star-empty display-only" />);
  }

  return <div className="rate-recipe">{stars}</div>;
}

export default RecipeRating;
