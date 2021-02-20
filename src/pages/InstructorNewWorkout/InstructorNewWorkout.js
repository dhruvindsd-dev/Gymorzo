import React, { Component, useEffect, useState } from "react";
import { AxiosInstance } from "../../App";
import StateUiOne from "./StateUiOne/StateUiOne";
import StateUiTwo from "./StateUiTwo/StateUiTwo";
import StateUiThree from "./StateUiThree/StateUiThree";
import { NavLink } from "react-router-dom";
//  nme , exercices , rest time and exercise time
// 3 different states : name , exercies and time
// 2 way binding is very nessesary because : lets say the user goes back from state 3 to state 1 in that case we the same data to show and not some blank thing
class InstructorNewWorkout extends Component {
  state = {
    StateNo: 1,
    Data: {
      name: "",
      activeTime: 0,
      restTime: 0,
      touched: false,
    },
    exercises: [],
  };
  componentDidMount() {
    const type = this.props.match.params.type;
    if (type === "name") this.setState({ StateNo: 1 });
    if (type === "exercises") this.setState({ StateNo: 2 });
    if (type === "time") this.setState({ StateNo: 3 });
    if (this.state.exercises.length === 0)
      AxiosInstance.get("/get-all-exercises-name").then((res) => {
        this.setState({ exercises: res.data });
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.type !== prevProps.match.params.type)
      this.componentDidMount();
  }
  handleExerciseCheckbox = (index, event) => {
    // handle the selection of exercises
    const updatedExercises = [...this.state.exercises];
    const updatedExercise = { ...updatedExercises[index] };
    if (event.target.checked) updatedExercise.checked = true;
    else updatedExercise.checked = false;
    updatedExercises[index] = updatedExercise;
    this.setState({ exercises: updatedExercises });
  };
  handleRemoveExercise = (id) => {
    const updatedExercises = [...this.state.exercises];
    for (let i = 0; i < updatedExercises.length; i++) {
      if (updatedExercises[i].id === id) {
        const updatedExercise = { ...updatedExercises[i] };
        updatedExercise.checked = false;
        updatedExercises[i] = updatedExercise;
        this.setState({ exercises: updatedExercises });
        break;
      }
    }
    // setAllExercises(updatedExercises);
  };
  handleInputChange = (item, value) => {
    const data = { ...this.state.Data };
    data[item] = value;
    data.touched = true;
    this.setState({ Data: data });
  };
  handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("activeTime", this.state.Data.activeTime.toString());
    formdata.append("restTime", this.state.Data.restTime.toString());
    formdata.append("name", this.state.Data.name);
    const exerciseIds = [];
    for (let item of this.state.exercises) {
      if (item.checked) exerciseIds.push(item.id);
    }
    formdata.append("exercises", exerciseIds.join(","));
    AxiosInstance.post("/create-instructor-workout", formdata).then((res) => {
      this.props.history.push("/instructor/workouts");
    });
  };
  render() {
    const StateNo = this.state.StateNo;
    let stateUi;

    if (StateNo === 1)
      stateUi = (
        <StateUiOne
          value={this.state.Data.name}
          handleInput={this.handleInputChange}
          touched={this.state.Data.touched}
          next={() => {
            this.props.history.push("exercises");
          }}
        />
      );
    else if (StateNo === 2)
      stateUi = (
        <StateUiTwo
          allExercises={this.state.exercises}
          exerciseChangeHandler={this.handleExerciseCheckbox}
          removeExercise={this.handleRemoveExercise}
          next={() => {
            this.props.history.push("time");
          }}
        />
      );
    else
      stateUi = (
        <StateUiThree
          activeTime={this.state.Data.activeTime}
          restTime={this.state.Data.restTime}
          change={this.handleInputChange}
          done={this.handleSubmit}
        />
      );
    return (
      <div className="section">
        <p className="is-size-3 has-text-weight-bold has-text-centered">
          New Workout
        </p>
        <nav className="breadcrumb is-centered has-arrow-separator">
          <ul>
            <li>
              <NavLink activeClassName="is-active" to="name">
                Name
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="is-active" to="exercises">
                Exercises
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="is-active" to="time">
                Time
              </NavLink>
            </li>
          </ul>
        </nav>
        {stateUi}
      </div>
    );
  }
}
export default InstructorNewWorkout;
