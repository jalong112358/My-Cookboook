const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 charecters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }
  if (!Validator.isLength(data.bio, { min: 3, max: 100 })) {
    errors.bio = "Bio needs to be between 3 and 100 charecters";
  }
  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Bio is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
