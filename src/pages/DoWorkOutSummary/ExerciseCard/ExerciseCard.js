import React from "react";
import exeriseImg from "../../../assets/img/ex1.gif";

const ExerciseCard = ({ name, muscle }) => {
  return (
    <div className="columns hover_scale is-mobile p-0 m-0">
      <div
        className="column is-3-desktop is-4-touch column_img bg-img"
        style={{
          backgroundImage: `url(${exeriseImg})`,
          objectFit: "contain",
        }}
      >
        <figure className="image is-square"></figure>
      </div>
      <div className="column has-background-light hover_scale_column">
        <div>
          <p className="is-size-4 is-size-6-mobile has-text-weight-bold has-text-black">
            {name}
          </p>
          <p className="is-size-5 is-hidden-mobile subtitle">{muscle}</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
