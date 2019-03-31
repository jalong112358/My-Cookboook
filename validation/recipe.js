const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.cooktime = !isEmpty(data.cooktime) ? data.cooktime : "";
  data.preptime = !isEmpty(data.preptime) ? data.preptime : "";
  data.servings = !isEmpty(data.servings) ? data.servings : "";
  data.calories = !isEmpty(data.calories) ? data.calories : "";
  data.ingredients = !isEmpty(data.ingredients) ? data.ingredients : "";
  data.directions = !isEmpty(data.directions) ? data.directions : "";

  //Title
  if (Validator.isEmpty(data.title)) {
    errors.title = "Please enter a title for this recipe";
  }
  // Description
  if (!Validator.isLength(data.description, { min: 3, max: 300 })) {
    errors.description = "Description must be between 3 and 300 charecters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Please write a description for this recipe";
  }

  //Cooktime

  if (Validator.isEmpty(data.cooktime)) {
    errors.cooktime = "Please enter a cooktime";
  }

  //Preptime

  if (Validator.isEmpty(data.preptime)) {
    errors.preptime = "Please enter a preptime";
  }

  //Servings

  if (Validator.isEmpty(data.servings)) {
    errors.servings = "Please enter the number of servings";
  }

  //Calories

  if (Validator.isEmpty(data.calories)) {
    errors.calories = "Please enter the number of calories";
  }

  //Ingredients
  if (data.ingredients.length < 1) {
    errors.ingredients = "Please enter your ingredients";
  }

  //Directions
  if (data.directions.length < 1) {
    errors.directions = "Please enter your directions";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
