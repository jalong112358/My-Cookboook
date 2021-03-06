import React from "react";
import "./Backdrop.css";

const Backdrop = props => {
  let backdropClasses = "backdrop";
  if (props.show) {
    backdropClasses = "backdrop open";
  }

  return <div className={backdropClasses} onClick={props.click} />;
};

export default Backdrop;
