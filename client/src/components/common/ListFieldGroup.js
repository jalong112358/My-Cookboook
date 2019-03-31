import React, { Component } from "react";
import classnames from "classnames";

class ListFieldGroup extends Component {
  state = {
    inputValues: ["", "", ""]
  };

  addInput = e => {
    let newArray = [...this.state.inputValues];
    newArray.push("");
    this.setState({
      inputValues: newArray
    });
  };

  deleteItem = (index, e) => {
    let newArray = [...this.state.inputValues];
    newArray.splice(index, 1);

    this.setState(
      {
        inputValues: newArray
      },
      () => {
        this.updateParent();
      }
    );
  };

  updateParent = () => {
    this.props.parentUpdate(this.state.inputValues);
  };

  changeValue = (index, e) => {
    let newArray = [...this.state.inputValues];
    newArray.splice(index, 1, e.target.value);

    this.setState(
      {
        inputValues: newArray
      },
      () => {
        this.updateParent();
      }
    );
  };

  render() {
    const {
      type,
      error,
      placeholder,
      name,
      title,
      value,
      onChange,
      disabled,
      parentUpdate
    } = this.props;

    const inputs = this.state.inputValues.map((item, index) => {
      let key = "step" + index;
      return (
        <div className="input-list-item" key={index}>
          <div className="list-indicator">{index + 1}</div>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={item}
            onChange={e => this.changeValue(index, e)}
            disabled={disabled}
          />
          <i
            class="far fa-trash-alt"
            onClick={e => this.deleteItem(index, e)}
          />
        </div>
      );
    });
    return (
      <div
        className={classnames("form-group", {
          "is-invalid": error
        })}
      >
        <label for={name}>{title}</label>

        {inputs}

        <button type="button" onClick={this.addInput} className="add-btn">
          Add <i class="fas fa-plus" />
        </button>
        {error && (
          <span className="form-error" style={{ marginLeft: "10px" }}>
            {error}
          </span>
        )}
      </div>
    );
  }
}

export default ListFieldGroup;
