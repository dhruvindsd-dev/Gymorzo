import React from "react";

const StateUiOne = ({ handleInput, value, touched, next }) => (
  <div className="is-flex is-justify-content-center">
    <div className="field has-addons mt-6">
      <div className="control">
        <label className=" button is-static ">Workout Name</label>
      </div>
      <div className="control">
        <input
          type="text"
          onChange={(evnt) => {
            handleInput("name", evnt.target.value);
          }}
          value={value}
          className="input"
        />
        {touched && value == 0 && (
          <p className="help is-danger">Enter A Valid Name</p>
        )}
      </div>
      <div className="control">
        <button
          disabled={!(value.length > 0)}
          className="button is-link is-light is-outlined"
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);
// @ts-ignore
export default StateUiOne;
