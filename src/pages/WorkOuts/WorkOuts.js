import React from "react";
import { Link } from "react-router-dom";
import Past from "./Past";
import Pending from "./Pending";

const WorkOuts = ({ match }) => {
  // * see if instructor is assigned : if no then tell the user so,
  // * if there : show two panel kind of things past workouts and pending workouts ...
  let type = match.params.type;
  let isPendingWorkout = false;
  if (type === "pending") isPendingWorkout = true;
  else if (type === "past") isPendingWorkout = false;
  else {
    // redirect to 404
  }
  let workouts;
  return (
    <div className="section">
      <div className="buttons field has-addons is-justify-content-center">
        <div className="control">
          <Link
            to="/workouts/pending"
            className={
              "button is-primary is-medium " +
              (isPendingWorkout ? "" : "is-light is-outlined ")
            }
          >
            Pending Workouts
          </Link>
        </div>
        <div className="control">
          <Link
            to="/workouts/past"
            className={
              "button is-primary is-medium " +
              (isPendingWorkout ? "is-light is-outlined" : "")
            }
          >
            Past Workouts
          </Link>
        </div>
      </div>
      <div>{isPendingWorkout ? <Pending /> : <Past />}</div>
    </div>
  );
};

export default WorkOuts;
