const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  // data.rating = !isEmpty(data.rating) ? data.rating : "";

  if (!Validator.isLength(data.text, { min: 1, max: 100 })) {
    errors.text = "Please keep your review under 300 charecter";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Please leave a review in the input field above";
  }
  // if (Validator.isEmpty(data.rating)) {
  //   errors.rating = "Please rate this recipe";
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
