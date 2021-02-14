import React, { useEffect, useState, Component } from "react";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import AfterWorkout from "./AfterWorkout";
import DoWorkOut from "./DoWorkOut";
import ExerciseCard from "./ExerciseCard/ExerciseCard";

const DoWorkOutSummary = (props) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [WorkoutProgress, setWorkoutProgress] = useState({
    didStart: false,
    didEnd: false,
    currentExerciseNo: 0,
    maxExerciseNumber: 0,
  });
  const [WorkoutSummaryData, setWorkoutSummaryData] = useState({});
  useEffect(() => {
    setIsLoading(true);
    AxiosInstance.get("/get-workout-from-id", {
      params: {
        workoutId: props.match.params.id,
      },
    }).then((res) => {
      console.log(res.data);
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
    if (WorkoutProgress.currentExerciseNo - 1 > 0)
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
  // gotta create a arr of all the exer and make a current exercise index :then loop through that list one by one and complete all the exercise with rest time included.
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
            style={{ borderRadius: "50%" }}
            className="button is-large is-danger"
          >
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
