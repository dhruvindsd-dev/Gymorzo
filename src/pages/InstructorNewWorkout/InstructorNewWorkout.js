import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../App";
import StateUiOne from "./StateUiOne/StateUiOne";
import StateUiTwo from "./StateUiTwo/StateUiTwo";
import StateUiThree from "./StateUiThree/StateUiThree";
//  nme , exercices , rest time and exercise time
// 3 different states : name , exercies and time
// 2 way binding is very nessesary because : lets say the user goes back from state 3 to state 1 in that case we the same data to show and not some blank thing
const InstructorNewWorkout = ({ history, match }) => {
  const [StateNo, setStateNo] = useState(1);
  const [Data, setData] = useState({
    name: "",
    activeTime: 0,
    restTime: 0,
    touched: false, //
  });
  // the exercises which have a
  const [AllExercises, setAllExercises] = useState([]);
  useEffect(() => {
    // showing state according to the url
    if (match.params.type === "name") setStateNo(1);
    if (match.params.type === "exercises") setStateNo(2);
    if (match.params.type === "time") setStateNo(3);
    // setData({ ...Data, touched: false });
    //   get exercise data from backend
    if (!!!AllExercises.length)
      AxiosInstance.get("get-all-exercises-name").then((res) => {
        setAllExercises(res.data);
      });
  }, [match.params.type]);
  const handleExerciseCheckbox = (index, event) => {
    // handle the selection of exercises
    const updatedExercises = [...AllExercises];
    const updatedExercise = { ...AllExercises[index] };
    if (event.target.checked) updatedExercise.checked = true;
    else updatedExercise.checked = false;
    updatedExercises[index] = updatedExercise;
    setAllExercises(updatedExercises);
  };
  const handleRemoveExercise = (id) => {
    const updatedExercises = [...AllExercises];
    for (let i = 0; i < updatedExercises.length; i++) {
      if (updatedExercises[i].id == id) {
        const updatedExercise = { ...updatedExercises[i] };
        updatedExercise.checked = false;
        updatedExercises[i] = updatedExercise;
        setAllExercises(updatedExercises);
        break;
      }
    }
    setAllExercises(updatedExercises);
  };
  const handleInputChange = (item, value) => {
    const data = { ...Data };
    data[item] = value;
    data.touched = true;
    setData(data);
  };
  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("activeTime", Data.activeTime.toString());
    formdata.append("restTime", Data.restTime.toString());
    formdata.append("name", Data.name);
    const exerciseIds = [];
    for (let item of AllExercises) {
      if (item.checked) exerciseIds.push(item.id);
    }
    formdata.append("exercises", exerciseIds.join(","));
    AxiosInstance.post("/create-instructor-workout", formdata).then((res) => {
      history.push("/instructor/workouts");
    });
  };
  let stateUi;
  if (StateNo === 1)
    stateUi = (
      <StateUiOne
        value={Data.name}
        handleInput={handleInputChange}
        touched={Data.touched}
        next={() => {
          history.push("exercises");
        }}
      />
    );
  else if (StateNo === 2)
    stateUi = (
      <StateUiTwo
        allExercises={AllExercises}
        exerciseChangeHandler={handleExerciseCheckbox}
        removeExercise={handleRemoveExercise}
        next={() => {
          history.push("time");
        }}
      />
    );
  else
    stateUi = (
      <StateUiThree
        activeTime={Data.activeTime}
        restTime={Data.restTime}
        change={handleInputChange}
        done={handleSubmit}
      />
    );
  return (
    <div className="section">
      <p className="is-size-2 has-text-weight-bold has-text-centered">
        New Workout
      </p>
      {stateUi}
    </div>
  );
};

export default InstructorNewWorkout;
