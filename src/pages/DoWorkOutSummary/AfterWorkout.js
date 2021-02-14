import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "../../App";
import img from "../../assets/img/workoutComplete.gif";
import Loader from "../../components/Loader/Loader";

const AfterWorkout = ({ id }) => {
  console.log(id);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // send data to backend
    AxiosInstance.delete("/workout-complete", {
      params: {
        workoutDateId: id,
      },
    }).then((res) => {
      setIsLoading(false);
    });
  }, []);
  let workout;
  if (IsLoading) workout = <Loader>Saving Your Workout ... </Loader>;
  else
    workout = (
      <div className="buttons is-centered">
        <Link to="/workouts/pending" className="button is-medium">
          Workout More
        </Link>
        <Link to="/feed" className="button is-medium">
          Go to feed
        </Link>
      </div>
    );
  return (
    <div className="is-flex is-justify-content-center">
      <div>
        <div className="is-flex is-justify-content-center">
          <figure className="image">
            <img src={img} alt="" />
          </figure>
        </div>
        <br />
        {workout}
      </div>
    </div>
  );
};

export default AfterWorkout;
