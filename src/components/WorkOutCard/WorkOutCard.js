import React from "react";
import { Link } from "react-router-dom";

const WorkOutCard = ({ title, muscles, time, id }) => {
  return (
    <div className="box red-gradient">
      <div className="columns">
        <div className="column">
          <p className="is-size-4 is-size-5-touch has-text-weight-semibold">
            {title}
          </p>
          <p>{muscles}</p>
        </div>
        <div className="column has-text-right">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <p className="is-size-5">{time}</p>
            <Link
              to={`/workout/${id}`}
              style={{ borderRadius: "50%" }}
              className="button ml-5 is-large is-danger"
            >
              <span className="icon ">
                <i className="fas fa-dumbbell"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOutCard;
