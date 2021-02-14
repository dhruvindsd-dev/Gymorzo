import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import WorkOutCard from "../../components/WorkOutCard/WorkOutCard";

const WorkOuts = (props) => {
  // * see if instructor is assigned : if no then tell the user so,
  // * if there : show two panel kind of things past workouts and pending workouts ...
  const [ShowPendingWorkOuts, setShowPendingWorkOuts] = useState(true);
  const [WorkOutsList, setWorkOutsList] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let urlEnding;
    if (props.match.params.type == "pending") {
      setShowPendingWorkOuts(true);
      urlEnding = "pending";
    } else if (props.match.params.type == "past") {
      setShowPendingWorkOuts(false);
      urlEnding = "past";
    } else {
      // redirect to 404
    }
    AxiosInstance.get(`/get-user-workouts/${urlEnding}`).then((res) => {
      setWorkOutsList(res.data);
      setIsLoading(false);
    });
  }, [props.match.params.type]);
  let workoutCards;
  if (IsLoading) workoutCards = <Loader />;
  else if (WorkOutsList.length > 0)
    workoutCards = (
      <div className="columns is-multiline is-mobile">
        {WorkOutsList.map((item, i) => (
          <div className="column is-3-desktop is-6-touch " key={i}>
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
              (ShowPendingWorkOuts ? "" : "is-light is-outlined ")
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
              (ShowPendingWorkOuts ? "is-light is-outlined" : "")
            }
          >
            Past Workouts
          </Link>
        </div>
      </div>
      <div className="">{workoutCards}</div>
    </div>
  );
};

export default WorkOuts;
