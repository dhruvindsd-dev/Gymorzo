import React, { useEffect, useState, Component } from "react";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import AfterWorkout from "./AfterWorkout";
import DoWorkOut from "./DoWorkOut";
import ExerciseCard from "./ExerciseCard/ExerciseCard";

class DoWorkOutSummary extends Component {
  state = {
    isLoading: true,
    WorkoutProgress: {
      didStart: false,
      didEnd: false,
      currentExerciseNo: 0,
      maxExerciseNumber: 0,
    },
    WorkoutSummaryData: {
      exercise: [],
      exercise_time: 0,
      id: 0,
      instructor: 0,
      name: "",
      rest_time: 0,
      total_time: 0,
    },
  };
  componentDidMount() {
    AxiosInstance.get("/get-workout-from-id", {
      params: {
        workoutId: this.props.match.params.id,
      },
    }).then((res) => {
      const updatedState = { ...this.state };
      const updatedSummaryData = {
        ...updatedState.WorkoutSummaryData,
        ...res.data,
      };
      const updatedWorkoutProgress = {
        ...updatedState.WorkoutProgress,
        maxExerciseNumber: res.data.exercise.length,
      };
      updatedState.isLoading = false;
      this.setState({
        isLoading: false,
        WorkoutProgress: updatedWorkoutProgress,
        WorkoutSummaryData: updatedSummaryData,
      });
    });
  }
  nextExercise = () => {
    const updatedWorkoutProgress = { ...this.state.WorkoutProgress };
    if (
      updatedWorkoutProgress.currentExerciseNo + 1 <
      updatedWorkoutProgress.maxExerciseNumber
    ) {
      updatedWorkoutProgress.currentExerciseNo++;
      this.setState({
        WorkoutProgress: updatedWorkoutProgress,
      });
    } else {
      updatedWorkoutProgress.didEnd = true;
      updatedWorkoutProgress.currentExerciseNo = 0;
      this.setState({
        WorkoutProgress: updatedWorkoutProgress,
      });
    }
  };
  prevExercise = () => {
    const updateWorkoutProgress = this.state.WorkoutProgress;
    if (updateWorkoutProgress.currentExerciseNo - 1 >= 0) {
      updateWorkoutProgress.currentExerciseNo--;
      this.setState({
        WorkoutProgress: updateWorkoutProgress,
      });
    }
  };
  handleStart = () => {
    const updatedWorkoutProgress = { ...this.state.WorkoutProgress };
    updatedWorkoutProgress.didStart = true;
    this.setState({
      WorkoutProgress: updatedWorkoutProgress,
    });
  };
  render() {
    console.log(this.state);
    if (this.state.WorkoutProgress.didEnd)
      return <AfterWorkout id={this.state.WorkoutSummaryData.id} />;
    if (this.state.WorkoutProgress.didStart)
      return (
        <DoWorkOut
          exercise={
            this.state.WorkoutSummaryData.exercise[
              this.state.WorkoutProgress.currentExerciseNo
            ]
          }
          activeTime={this.state.WorkoutSummaryData.exercise_time}
          restTime={this.state.WorkoutSummaryData.rest_time}
          next={this.nextExercise}
          prev={this.prevExercise}
        />
      );
    let exercises;
    if (this.state.isLoading) exercises = <Loader />;
    else
      exercises = (
        <>
          <p className="is-size-6 l-opacity has-text-centered">
            Total Workout Time :{" "}
            {Math.floor(this.state.WorkoutSummaryData.total_time / 60)}
            min
          </p>
          <hr />
          <div className="columns is-multiline">
            {this.state.WorkoutSummaryData.exercise.map((item, i) => (
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
              onClick={this.handleStart}
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
  }
}

export default DoWorkOutSummary;
