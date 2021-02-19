import React from "react";
import { Link, useHistory } from "react-router-dom";

const WorkOutCard = ({ title, muscles, time, id }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/workout/${id}`);
  };
  return (
    <div
      className="notification primary-gradient is-relative is-clickable"
      onClick={handleClick}
    >
      <p className="is-size-4 has-text-weight-bold">{title}</p>
      <div className="columns">
        <div className="column is-8">
          <p>{muscles}</p>
        </div>
        <div className="column">
          <div className="button  has-text-weight-semibold is-small is-light is-static is-primary  workout-tag">
            {time} min
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOutCard;
