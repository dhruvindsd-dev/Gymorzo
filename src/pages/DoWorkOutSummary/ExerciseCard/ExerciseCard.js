import React from "react";
import exeriseImg from "../../../assets/img/ex1.gif";

const ExerciseCard = ({ name, muscle }) => {
  return (
    <div className="columns primary-gradient is-mobile p-0 m-0">
      <div
        className="column is-3-desktop is-4-touch column_img bg-img"
        style={{
          backgroundImage: `url(${exeriseImg})`,
          objectFit: "contain",
        }}
      >
        <figure className="image is-square"></figure>
      </div>
      <div className="column ">
        <p className="is-size-4 has-text-weight-bold">{name}</p>
        <p>{muscle}</p>
      </div>
    </div>
  );
};

export default ExerciseCard;
