import React from "react";

const ErrorMsg = ({ errMsg, children = null }) => {
  return (
    <div
      className="notification is-danger is-light my-4"
      style={{ border: "1px solid #cc0f35" }}
    >
      <p className="is-size-5 is-size-6-mobile has-text-weight-semibold">
        <span className="icon is-medium">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        {errMsg}
      </p>
      {!!children ? <p className="is-size-6">{children}</p> : null}
    </div>
  );
};

export default React.memo(ErrorMsg);
