import React from "react";
import MainFeed from "./MainFeed/MainFeed";
import UserPanel from "./UserPanel/UserPanel";

const Feed = () => {
  return (
    <div className="section">
      <div className="columns is-centered">
        <MainFeed />
        <UserPanel />
      </div>
    </div>
  );
};

export default Feed;
