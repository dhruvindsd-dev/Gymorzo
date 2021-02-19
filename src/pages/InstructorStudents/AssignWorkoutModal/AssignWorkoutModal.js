import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../App";
import Loader from "../../../components/Loader/Loader";
import useFetchWithCache from "../../../Hooks/fetchWithCache";
import WorkOutCard from "./WorkoutCard/WorkoutCard";

const AssignWorkoutModal = ({ name, closeModal }) => {
  console.log(name);
  // caching wtth the same name as api route so can use cached data from /instructor/workouts. will save one api request
  const [data, isLoading] = useFetchWithCache(
    "/get-instructor-workouts",
    "/get-instructor-workouts"
  );

  let workouts;
  if (isLoading) workouts = <Loader />;
  else
    workouts = data.map((item, i) => (
      <WorkOutCard
        key={i}
        name={item.details.name}
        muscles={item.details.muscles.join(", ")}
        time={item.details.totalTime}
        username={name}
        workoutId={item.details.id}
        closeModal={closeModal}
      />
    ));
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Assign Workout to{" "}
            <span className="has-text-weight-bold">{name}</span>
          </p>
          <button className="delete" onClick={closeModal}></button>
        </header>
        <div className="modal-card-body ">{workouts}</div>
        <footer className="modal-card-foot">
          <button className="button is-link">Done</button>
        </footer>
      </div>
    </div>
  );
};

export default AssignWorkoutModal;
