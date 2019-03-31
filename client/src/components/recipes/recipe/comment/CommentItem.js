import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../../../actions/recipeActions";
import DisplayCommentRating from "./DisplayCommentRating";

class CommentItem extends Component {
  onDeleteClick(recipeId, commentId) {
    this.props.deleteComment(recipeId, commentId);
  }

  render() {
    const { comment, recipeId, auth } = this.props;
    console.log(comment.rating);
    return (
      <div className="comment-item">
        <div className="comment-item-top">
          <Link className="user-link" to={`/profile/user/${comment.user}`}>
            <span>{comment.name}</span>
          </Link>
          <p className="comment-item-date">
            <Moment format="MM/DD/YYYY" date={comment.date} />
          </p>
        </div>

        <DisplayCommentRating rating={comment.rating} />

        <p className="comment-text">"{comment.text}"</p>
        {comment.user === auth.user.id ? (
          <button
            onClick={this.onDeleteClick.bind(this, recipeId, comment._id)}
            type="button"
            className="btn btn-danger mr-1"
          >
            <i class="far fa-trash-alt" />
          </button>
        ) : null}
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  recipeId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
