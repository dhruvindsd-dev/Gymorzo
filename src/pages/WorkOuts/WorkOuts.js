import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance, CACHE } from "../../App";
import Loader from "../../components/Loader/Loader";
import WorkOutCard from "../../components/WorkOutCard/WorkOutCard";

const WorkOuts = ({ match }) => {
  // * see if instructor is assigned : if no then tell the user so,
  // * if there : show two panel kind of things past workouts and pending workouts ...
  const [WorkOutsList, setWorkOutsList] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const isPendingWorkouts = match.params.type === "pending" ? true : false;
  console.log("rendering ");
  useEffect(() => {
    let params = match.params.type;
    if (params !== "pending" || params !== "past ") {
      // redirect to 404
    }
    if (CACHE.has(`/workouts/${params}`))
      setWorkOutsList(CACHE.get(`/workouts/${params}`));
    else {
      setIsLoading(true);
      AxiosInstance.get(`/get-user-workouts/${params}`).then((res) => {
        CACHE.set(`/workouts/${params}`, res.data);
        setWorkOutsList(res.data);
        setIsLoading(false);
      });
    }
  }, [match.params.type]);
  let workoutCards;
  if (IsLoading) workoutCards = <Loader />;
  else if (WorkOutsList.length > 0)
    workoutCards = (
      <div className="columns is-multiline is-mobile">
        {WorkOutsList.map((item, i) => (
          <div className="column is-3-desktop is-half-touch" key={i}>
            <WorkOutCard
              title={item.workout.details.name}
              muscles={item.workout.details.muscles.join(", ")}
              time={item.workout.details.totalTime}
              id={item.workout.details.id}
            />
          </div>
        ))}
      </div>
    );
  else
    workoutCards = (
      <p className="title section has-text-centered l-opacity">
        No Workouts Found.
      </p>
    );

  return (
    <div className="section">
      <div className="buttons field has-addons is-justify-content-center">
        <div className="control">
          <Link
            to="/workouts/pending"
            className={
              "button is-primary is-medium " +
              (isPendingWorkouts ? "" : "is-light is-outlined ")
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
              (isPendingWorkouts ? "is-light is-outlined" : "")
            }
          >
            Past Workouts
          </Link>
        </div>
      </div>
      <div>{workoutCards}</div>
    </div>
  );
};

export default WorkOuts;
