import React from "react";
import Loader from "../../components/Loader/Loader";
import useFetchWithCache from "../../Hooks/fetchWithCache";
import WorkoutCardList from "./WorkoutCardList";

export default function Pending() {
  const [data, isLoading] = useFetchWithCache(
    "/get-user-workouts/pending",
    "pending-workouts"
  );
  let workouts;
  if (isLoading) workouts = <Loader />;
  else workouts = <WorkoutCardList cardList={data} />;
  return <div>{workouts}</div>;
}
