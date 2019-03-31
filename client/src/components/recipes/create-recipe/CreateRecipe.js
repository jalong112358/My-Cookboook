import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import uuidv4 from "uuid/v4";
import Spinner from "../../common/Spinner/Spinner";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";

import ListFieldGroup from "../../common/ListFieldGroup";

import { createRecipe } from "../../../actions/recipeActions";
import { getCurrentProfile } from "../../../actions/profileActions";

import "./CreateRecipe.css";
import axios from "axios";

class CreateRecipe extends Component {
  state = {
    title: "",
    preptime: "",
    cooktime: "",
    servings: "",
    image: null,
    imageId: "",
    newImageName: "",
    previewImageLoading: false,
    previewImageLoaded: false,
    previewImageRendered: false,
    imagePreview: null,
    description: "",
    calories: "",
    ingredients: [],
    directions: [],

    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    const imageId = uuidv4();
    this.setState({
      imageId: imageId
    });
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateIngredients = value => {
    this.setState({
      ingredients: value
    });
  };

  updateDirections = value => {
    this.setState({
      directions: value
    });
  };

  handleImageLoaded = () => {
    this.setState({
      previewImageRendered: true,
      previewImageLoading: false
    });
  };

  fileSelectedHandler = e => {
    this.setState(
      {
        image: e.target.files[0]
      },
      () => {
        const file = this.state.image.name;
        const fileExt = getFileExt(file);
        function getFileExt(file) {
          return file.split(".").pop();
        }
        const newImageName = this.state.imageId + "." + fileExt;
        this.setState(
          {
            newImageName: newImageName
          },
          () => {
            console.log(this.state.image);
            // this.setState({
            //   imagePreview: URL.createObjectURL(this.state.image)
            // });

            const fd = new FormData();
            fd.append("file", this.state.image, this.state.newImageName);

            axios.post("/api/images", fd).then(res => {
              this.setState({
                previewImageLoaded: true
              });
            });
            this.setState({
              previewImageLoading: true
            });
          }
        );
      }
    );
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({
        errors: newProps.errors
      });
    }
  }

  // uploadImage = () => {

  // };

  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;
    const { profile } = this.props.profile;

    const recipeData = {
      name: user.name,
      userhandle: profile.handle,
      title: this.state.title,
      preptime: this.state.preptime,
      cooktime: this.state.cooktime,
      servings: this.state.servings,
      imageId: this.state.newImageName,
      description: this.state.description,
      calories: this.state.calories,
      ingredients: this.state.ingredients,
      directions: this.state.directions
    };

    this.props.createRecipe(recipeData);
  };
  render() {
    const { errors } = this.state;
    let previewImageClasses = "preview-image";

    if (this.state.previewImageRendered) {
      previewImageClasses = "preview-image open";
    }
    console.log(this.state.previewImageLoaded);

    return (
      <div className="create-recipe">
        <form onSubmit={this.onSubmit}>
          <div className="create-recipe-heading">
            <h1 className="heading">Add Recipe</h1>
            <p className="sub-heading">
              Fill out the form below to add a new recipe.
            </p>
          </div>
          <div className="create-recipe-section">
            <div className="image-upload-area">
              <div className="preview-image-area">
                {this.state.previewImageLoaded ? (
                  <img
                    className={previewImageClasses}
                    onLoad={this.handleImageLoaded.bind(this)}
                    src={`/api/images/${this.state.newImageName}`}
                  />
                ) : !this.state.previewImageLoading ? (
                  <div className="placeholder-image">
                    <i class="fas fa-cloud-upload-alt fa-2x" />
                  </div>
                ) : null}

                {this.state.previewImageLoading ? (
                  <div className="loading-image">
                    <Spinner />
                  </div>
                ) : null}
              </div>

              <label htmlFor="file" className="file-upload">
                <input
                  id="file"
                  type="file"
                  name="file"
                  onChange={this.fileSelectedHandler}
                />
                Upload File
              </label>
            </div>
            <div className="create-recipe-section-inputs">
              <TextFieldGroup
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
                title="Recipe Title"
              />

              <TextAreaFieldGroup
                placeholder="Add a tasty overview describing your recipe"
                name="description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                title="Description"
              />
            </div>
          </div>

          <div className="recipe-info">
            <h2>Recipe Information</h2>
            <div className="form-row">
              <TextFieldGroup
                placeholder="Enter a number in minutes"
                name="preptime"
                value={this.state.preptime}
                onChange={this.onChange}
                error={errors.preptime}
                title="Prep time"
              />
              <TextFieldGroup
                placeholder="Number of calories"
                name="calories"
                value={this.state.calories}
                onChange={this.onChange}
                error={errors.calories}
                title="Calories"
              />
            </div>
            <div className="form-row">
              <TextFieldGroup
                placeholder="Enter a number in minutes"
                name="cooktime"
                value={this.state.cooktime}
                onChange={this.onChange}
                error={errors.cooktime}
                title="Cook time"
              />

              <TextFieldGroup
                placeholder="Number of servings"
                name="servings"
                value={this.state.servings}
                onChange={this.onChange}
                error={errors.servings}
                title="Number of servings"
              />
            </div>
          </div>

          <div className="create-recipe-ingredients">
            <h2>Ingredients</h2>
            <ListFieldGroup
              name="ingredients"
              error={errors.ingredients}
              parentUpdate={this.updateIngredients.bind(this)}
              error={errors.ingredients}
            />
          </div>

          <div className="create-recipe-directions">
            <h2>Directions</h2>
            <ListFieldGroup
              name="directions"
              error={errors.directions}
              parentUpdate={this.updateDirections.bind(this)}
              error={errors.directions}
            />
          </div>

          <button type="submit" className="form-submit-btn">
            Submit Recipe
          </button>
        </form>
      </div>
    );
  }
}

CreateRecipe.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  createRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createRecipe, getCurrentProfile }
)(CreateRecipe);
