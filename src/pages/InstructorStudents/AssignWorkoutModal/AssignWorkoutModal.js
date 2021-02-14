import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../App";
import Loader from "../../../components/Loader/Loader";
import WorkOutCard from "./WorkoutCard/WorkoutCard";

const AssignWorkoutModal = ({ name, closeModal }) => {
  const [WorkOuts, setWorkOuts] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // fetch all the instructor workouts
    setIsLoading(true);
    AxiosInstance.get("/get-instructor-workouts").then((res) => {
      setWorkOuts(res.data);
      setIsLoading(false);
      console.log(res.data);
    });
  }, []);
  let workouts;
  if (IsLoading) workouts = <Loader />;
  else
    workouts = WorkOuts.map((item, i) => (
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
