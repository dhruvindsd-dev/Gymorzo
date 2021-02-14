import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../App";

const StateUiTwo = ({
  allExercises,
  exerciseChangeHandler,
  next,
  removeExercise,
}) => {
  // showing and removing modal using css since i wann preserve the state of the input checkboxes
  const [ShowModal, setShowModal] = useState(false);

  //   const [SelectedExercises, setSelectedExercises] = useState([]);
  // functionality :
  // 1. get all the exercies and show em in a modal,
  // 2. remove exercies
  // 3. pass all the ids of the exercies in a method passes
  const selectedExercises = allExercises.filter((item) => !!item.checked);
  let exercises;
  if (!!selectedExercises.length)
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
  else
    exercises = (
      <p className="is-size-5 ">You Have Not Selected Any Exercise</p>
    );
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
      <p className="is-size-4 mb-3 has-text-weight-bold">Workout Exercises</p>
      {exercises}
      <div className="section has-text-centered">
        <button className="button is-link is-large" onClick={next}>
          <span>Next</span>
          <span className="icon">
            <i className="fas fa-chevron-right"></i>
          </span>
        </button>
      </div>
      <Modal
        exercise={allExercises}
        changed={exerciseChangeHandler}
        close={setShowModal.bind(this, false)}
        isActive={ShowModal && true}
        done={setShowModal.bind(this, false)}
      />
    </>
  );
};

const ExerciseCard = ({ name, muscles, remove }) => (
  <div className="column is-3-desktop is-6-touch">
    <div className="box red-gradient">
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

const Modal = ({ exercise, changed, close, done, isActive = false }) => (
  <div className={"modal " + (isActive && "is-active")}>
    <div className="modal-background" onClick={close}></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Exercises</p>
        <button className="delete"></button>
      </header>
      <section className="modal-card-body has-background-light">
        {exercise.map((item, i) => (
          <div key={i}>
            <label className="checkbox is-unselectable">
              <input
                checked={item.checked ? true : false}
                onChange={changed.bind(this, i)}
                type="checkbox"
                id=""
                className="mr-2"
              />
              <span className="is-size-5">{item.name}</span>
            </label>
            <br />
          </div>
        ))}
      </section>
      <footer className="modal-card-foot">
        <button className="button is-link" onClick={done}>
          Done
        </button>
      </footer>
    </div>
  </div>
);

export default StateUiTwo;
