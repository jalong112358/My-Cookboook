import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  title,
  error,
  icon,
  type,

  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <label for={name}>{title}</label>
      <div className="field-group">
        {icon}
        <input
          type={type}
          className={classnames("form-control form-control-lg", {
            "is-invalid": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>

      {error && <div className="form-error">{error}</div>}
    </div>
  );
};
TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,

  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
