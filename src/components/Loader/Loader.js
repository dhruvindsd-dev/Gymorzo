import React from "react";
import "./loader.css";
const Loader = (props) => {
  return (
    <div className="has-text-centered">
      <div className="lds-default is-centered">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {props.children}
    </div>
  );
};

export default Loader;
