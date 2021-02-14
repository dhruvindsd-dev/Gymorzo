import React, { useState } from "react";
import { AxiosInstance } from "../../../../App";

const WorkOutCard = ({
  name,
  time,
  muscles,
  username,
  workoutId,
  closeModal,
}) => {
  const [IsLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("workoutId", workoutId);
    setIsLoading(true);
    // userId and the instructror workoutID
    AxiosInstance.put("/assign-student-workout", formData).then((res) => {
      closeModal();
    });
  };
  return (
    <div className="my-3 px-2">
      <div className="columns is-mobile mb-0 is-marginless">
        <div className="column p-0 is-8">
          <p className="has-text-weight-semibold is-size-5">{name}</p>
          <p className=" l-opacity">{muscles}</p>
          <p className=" l-opacity">{time}</p>
        </div>
        <div className="column p-0 is-4 has-text-right center-vertically">
          <button
            onClick={handleSubmit}
            className={"button is-link " + (IsLoading ? "is-loading" : "")}
          >
            Assign Workout
          </button>
        </div>
      </div>
      <hr className="my-0" />
    </div>
  );
};

export default WorkOutCard;
