import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../../../common/TextAreaFieldGroup";
import { addComment } from "../../../../actions/recipeActions";
import RateRecipe from "./RateRecipe";

import "./Comments.css";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      rating: null,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
  changeRating = value => {
    this.setState({
      rating: value
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { recipeId } = this.props;
    const rating = {
      rating: this.state.rating
    };

    const newComment = {
      text: this.state.text,
      rating: this.state.rating,
      userId: user.id,
      name: user.name
    };

    this.props.addComment(recipeId, newComment);
    // this.props.addRating(recipeId, rating);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="comment-form">
        <form onSubmit={this.onSubmit}>
          <Link
            className="user-link"
            to={`/profile/user/${this.props.auth.user.id}`}
          >
            <span>{this.props.auth.user.name}</span>
          </Link>
          <RateRecipe
            error={errors.rating}
            parentUpdate={this.changeRating.bind(this)}
          />
          <TextAreaFieldGroup
            placeholder="Write a review for this recipe."
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            error={errors.text}
          />

          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  recipeId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipe: state.recipe,
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
