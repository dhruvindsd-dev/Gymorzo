import React, { useEffect, useState, Component } from "react";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import AfterWorkout from "./AfterWorkout";
import DoWorkOut from "./DoWorkOut";
import ExerciseCard from "./ExerciseCard/ExerciseCard";

const DoWorkOutSummary = ({ match }) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [WorkoutProgress, setWorkoutProgress] = useState({
    didStart: false,
    didEnd: false,
    currentExerciseNo: 0,
    maxExerciseNumber: 0,
  });
  const [WorkoutSummaryData, setWorkoutSummaryData] = useState({
    exercise: [],
    exercise_time: 0,
    id: 0,
    instructor: 0,
    name: "",
    rest_time: 0,
    total_time: 0,
  });
  useEffect(() => {
    setIsLoading(true);
    AxiosInstance.get("/get-workout-from-id", {
      params: {
        workoutId: match.params.id,
      },
    }).then((res) => {
      setWorkoutSummaryData(res.data);
      setWorkoutProgress({
        ...WorkoutProgress,
        maxExerciseNumber: res.data.exercise.length,
      });
      setIsLoading(false);
    });
  }, []);
  const nextExercise = () => {
    if (
      WorkoutProgress.currentExerciseNo + 1 <
      WorkoutProgress.maxExerciseNumber
    )
      setWorkoutProgress({
        ...WorkoutProgress,
        currentExerciseNo: WorkoutProgress.currentExerciseNo + 1,
      });
    else {
      // end of workout,
      // sending data to backend in AfterWorkout
      setWorkoutProgress({
        ...WorkoutProgress,
        didEnd: true,
        currentExerciseNo: 0,
      });
    }
  };
  const prevExercise = () => {
    if (WorkoutProgress.currentExerciseNo - 1 >= 0)
      setWorkoutProgress({
        ...WorkoutProgress,
        currentExerciseNo: WorkoutProgress.currentExerciseNo - 1,
      });
  };
  if (WorkoutProgress.didEnd)
    return <AfterWorkout id={WorkoutSummaryData.id} />;
  if (WorkoutProgress.didStart)
    return (
      <DoWorkOut
        exercise={
          WorkoutSummaryData.exercise[WorkoutProgress.currentExerciseNo]
        }
        activeTime={WorkoutSummaryData.exercise_time}
        restTime={WorkoutSummaryData.rest_time}
        next={nextExercise}
        prev={prevExercise}
      />
    );
  let exercises;
  if (IsLoading) exercises = <Loader />;
  else
    exercises = (
      <>
        <p className="is-size-6 l-opacity has-text-centered">
          Total Workout Time : {Math.floor(WorkoutSummaryData.total_time / 60)}
          min
        </p>
        <hr />
        <div className="columns is-multiline">
          {WorkoutSummaryData.exercise.map((item, i) => (
            <div className="column is-4" key={i}>
              <ExerciseCard name={item.name} muscle={item.muscle} />
            </div>
          ))}
        </div>
      </>
    );
  return (
    <div className="section">
      <p className="is-size-3-desktop is-size-4-touch has-text-weight-bold has-text-centered ">
        WorkOut Summary
      </p>
      {exercises}
      <nav className="navbar is-fixed-bottom is-flex is-justify-content-center">
        <div className="navbar-item">
          <button
            onClick={setWorkoutProgress.bind(this, {
              ...WorkoutProgress,
              didStart: true,
            })}
            className="button is-large is-danger"
          >
            <span>Start Workout</span>
            <span className="icon ">
              <i className="fas fa-dumbbell"></i>
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DoWorkOutSummary;
