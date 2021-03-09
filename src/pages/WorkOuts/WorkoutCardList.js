import React from "react";
import WorkOutCard from "../../components/WorkOutCard/WorkOutCard";

export default function WorkoutCardList({ cardList }) {
  let list;
  if (cardList.length === 0)
    list = (
      <p className="title section has-text-centered l-opacity">
        No Workouts Found.
      </p>
    );
  else
    list = cardList.map((item, i) => (
      <div className="column is-3-desktop is-half-touch" key={i}>
        <WorkOutCard
          title={item.workout.details.name}
          muscles={item.workout.details.muscles.join(", ")}
          time={item.workout.details.totalTime}
          id={item.workout.details.id}
        />
      </div>
    ));
  return <div className="columns is-multiline is-mobile">{list}</div>;
}
