import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  title,
  onChange
}) => {
  return (
    <div className="form-group">
      <label for={name}>{title}</label>
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />

      <span className="form-error">{error}</span>
    </div>
  );
};
TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,

  error: PropTypes.string,

  onChange: PropTypes.string.isRequired
};

export default TextAreaFieldGroup;
