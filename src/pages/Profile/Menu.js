import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import WorkOutCard from "../../components/WorkOutCard/WorkOutCard";
import PostCard from "../Feed/PostCard/PostCard";

const Menu = (props) => {
  const { posts } = props;
  console.log(props);
  const { type: menuType } = props.match.params;
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let urlEnding;
    if (menuType === "pending") urlEnding = "pending";
    else if (menuType === "past") urlEnding = "past";
    else return;
    AxiosInstance.get(`get-user-workouts/${urlEnding}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, [menuType]);
  let grid;
  if (IsLoading) grid = <Loader />;
  else if (menuType === "pending" || menuType === "past")
    if (!!Data.length)
      grid = Data.map((item, i) => (
        <div className="column is-3-desktop is-6-touch " key={i}>
          <WorkOutCard
            title={item.workout.details.name}
            muscles={item.workout.details.muscles.join(", ")}
            time={item.workout.details.totalTime}
            id={item.workout.details.id}
          />
        </div>
      ));
    else grid = <p className="is-title is-4">No Data Found</p>;
  else if (!!posts.length)
    grid = posts.map((item, i) => (
      <div className="column is-4" key={i}>
        <PostCard />
      </div>
    ));
  else grid = grid = <p className="is-title is-4">No Post Found</p>;
  return (
    <>
      <div className="tabs is-centered">
        <ul>
          <li>
            <NavLink
              to={`/profile/${props.match.params.username}`}
              exact
              activeClassName="is-active"
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/profile/${props.match.params.username}/workouts/pending`}
              exact
              activeClassName="is-active"
            >
              Pending Wokouts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/profile/${props.match.params.username}/workouts/past`}
              exact
              activeClassName="is-active"
            >
              Past Workouts
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="columns is-centered">
        <div className="column is-8">
          <div className="columns is-multiline is-mobile">{grid}</div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Menu);
