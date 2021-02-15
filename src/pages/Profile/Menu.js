import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AxiosInstance, CACHE } from "../../App";
import Loader from "../../components/Loader/Loader";
import WorkOutCard from "../../components/WorkOutCard/WorkOutCard";
import PostCard from "../Feed/PostCard/PostCard";

const Menu = ({ posts, pathname, params }) => {
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const menuType = params.type;
  const username = params.username;
  useEffect(() => {
    let urlEnding;
    if (menuType === "pending") urlEnding = "pending";
    else if (menuType === "past") urlEnding = "past";
    else return; // user posts url
    // setIsLoading(true);
    if (CACHE.has(pathname)) setData(CACHE.get(pathname));
    else {
      setIsLoading(true);
      AxiosInstance.get(`get-user-workouts/${urlEnding}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
        CACHE.set(pathname, res.data);
      });
    }
  }, [menuType]);
  let grid;
  if (IsLoading) grid = <Loader />;
  else if (menuType === "pending" || menuType === "past")
    if (!!Data.length)
      grid = (
        <div className="columns is-multiline is-mobile">
          {Data.map((item, i) => (
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
      grid = <p className="is-title is-4 has-text-centered">No Data Found</p>;
  else if (!!posts.length)
    grid = (
      <div className="columns is-multiline is-mobile">
        {posts.map((item, i) => (
          <div className="column is-4" key={i}>
            <PostCard />
          </div>
        ))}
      </div>
    );
  else grid = <p className="is-title is-4 has-text-centeredZ">No Post Found</p>;
  return (
    <>
      <div className="tabs is-centered">
        <ul>
          <li>
            <NavLink
              to={`/profile/${username}`}
              exact
              activeClassName="is-active"
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/profile/${username}/workouts/pending`}
              exact
              activeClassName="is-active"
            >
              Pending Wokouts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/profile/${username}/workouts/past`}
              exact
              activeClassName="is-active"
            >
              Past Workouts
            </NavLink>
          </li>
        </ul>
      </div>
      {grid}
      <div className="columns is-centered">
        <div className="column is-8"></div>
      </div>
    </>
  );
};

export default Menu;
