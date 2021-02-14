import React, { useEffect, useRef } from "react";

const Input = (props) => {
  let invalidClass = "";
  if (!props.valid && props.touched) {
    invalidClass = "is-primary";
  }
  return (
    <div className="field">
      <div className="control">
        <input
          type="text"
          onChange={props.change}
          value={props.value}
          className={"input " + invalidClass}
          {...props.config}
        />
      </div>
      {!props.valid && props.touched ? (
        <p className="help is-danger">{props.errorMsg}</p>
      ) : null}
    </div>
  );
};

export default React.memo(Input);
