import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../App";
import Modal from "./Modal";

const StateUiTwo = ({
  allExercises,
  exerciseChangeHandler,
  next,
  removeExercise,
}) => {
  const [ShowModal, setShowModal] = useState(false);
  const selectedExercises = allExercises.filter((item) => !!item.checked);
  let exercises;
  if (selectedExercises.length !== 0)
    exercises = (
      <div className="columns is-multiline is-mobile">
        {selectedExercises.map((item, i) => (
          <ExerciseCard
            name={item.name}
            key={i}
            muscles={item.muscle}
            remove={removeExercise.bind(this, item.id)}
          />
        ))}
      </div>
    );
  else exercises = <p>You Have Not Selected Any Exercise</p>;
  return (
    <>
      <button
        className="button is-link is-light is-outlined  mb-3"
        onClick={setShowModal.bind(this, true)}
      >
        <span className="icon">
          <i className="fas fa-plus"></i>
        </span>
        <span>Add Exercise</span>
      </button>
      <p className="is-size-3 mb-3 has-text-weight-bold">Workout Exercises</p>
      {exercises}
      <div className="section pl-0">
        <button className="button is-link" onClick={next}>
          <span>Next</span>
          <span className="icon">
            <i className="fas fa-chevron-right"></i>
          </span>
        </button>
      </div>
      {ShowModal && (
        <Modal
          exercise={allExercises}
          changed={exerciseChangeHandler}
          close={setShowModal.bind(this, false)}
        />
      )}
    </>
  );
};

const ExerciseCard = ({ name, muscles, remove }) => (
  <div className="column is-3-desktop is-6-touch">
    <div className="box primary-gradient">
      <div className="columns">
        <div className="column is-8">
          <p className="is-size-4 has-text-weight-semibold">{name}</p>
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
            <button
              onClick={remove}
              className="button ml-5 is-danger is-medium"
            >
              <span className="icon ">
                <i className="fas fa-times"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StateUiTwo;
