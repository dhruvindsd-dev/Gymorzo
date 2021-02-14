import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import WorkOutCard from "../../components/WorkOutCard/WorkOutCard";

const InstructorWorkouts = () => {
  const [WorkOutsList, setWorkOutsList] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [SearchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setIsLoading(true);
    AxiosInstance.get("/get-instructor-workouts").then((res) => {
      setWorkOutsList(res.data);
      setIsLoading(false);
    });
  }, []);
  const handleInputChange = (evnt) => {
    setSearchQuery(evnt.target.value);
  };
  let workoutCards;
  if (IsLoading) workoutCards = <Loader />;
  else if (WorkOutsList.length > 0)
    workoutCards = (
      <div className="columns is-multiline is-mobile">
        {WorkOutsList.filter(
          (item) =>
            item.details.name.toLowerCase().includes(SearchQuery) ||
            item.details.muscles.join(", ").toLowerCase().includes(SearchQuery)
        ).map((item, i) => (
          <div className="column is-3-desktop is-6-touch " key={i}>
            <WorkOutCard
              title={item.details.name}
              muscles={item.details.muscles.join(", ")}
              time={item.details.totalTime}
              id={item.details.id}
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
      <div className="buttons is-centered">
        <Link
          to="workouts/new/name"
          className="button is-link is-light is-outline"
        >
          <span className="icon">
            <i className="fas fa-plus"></i>''
          </span>
          <span>New Workout</span>
        </Link>
      </div>
      <div className="is-size-4 has-text-weight-semibold">My Workouts</div>
      <div className="field my-4">
        <div className="control has-icons-left">
          <input
            type="text"
            className="input"
            placeholder="search workouts or muscle groups"
            onChange={handleInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
      {workoutCards}
    </div>
  );
};

export default InstructorWorkouts;
