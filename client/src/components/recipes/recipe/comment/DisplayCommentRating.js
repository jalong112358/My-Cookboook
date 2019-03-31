import React from "react";
import "./Comments.css";
export default function DisplayCommentRating(props) {
  let stars = [];

  for (let i = 0; i < props.rating; i++) {
    let starValue = i + 1;
    stars.push(<i class="fas fa-star star-solid display-only" />);
  }
  for (let i = 0; i < 5 - props.rating; i++) {
    let starValue = i + props.rating + 1;
    stars.push(<i class="fas fa-star star-empty display-only" />);
  }

  return <div className="rate-recipe">{stars}</div>;
}
