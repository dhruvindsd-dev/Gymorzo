import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
      }}
      className="section has-background-danger "
    >
      <p className="title">
        {" "}
        This page does not exist. <Link to="/">Click here </Link> to ho home{" "}
      </p>
    </div>
  );
};

export default NotFound;
