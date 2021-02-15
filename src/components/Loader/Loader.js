import React from "react";
import "./loader.css";
const Loader = (props) => {
  return (
    <div className="is-flex is-justify-content-center">
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
