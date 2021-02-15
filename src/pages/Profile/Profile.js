import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import Menu from "./Menu";

const Profile = (props) => {
  const [ProfileDetails, setProfileDetails] = useState({});
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const username = props.match.params.username;
    AxiosInstance.get("get-user-profile-initial-load", {
      params: {
        username: username,
      },
    }).then((res) => {
      setProfileDetails(res.data);
      setIsLoading(false);
    });
  }, []);
  let restult;
  if (IsLoading) restult = <Loader />;
  else if (ProfileDetails === "no user found")
    restult = <Redirect to="/not-found" />;
  else
    restult = (
      <div className="section">
        <MainProfile profileDetails={ProfileDetails} />
        <Menu posts={ProfileDetails.posts} />
      </div>
    );
  return <> {restult}</>;
};

const MainProfile = ({ profileDetails }) => {
  const { user, status, followers, following, posts } = profileDetails;
  return (
    <div className="columns is-mobile is-centered">
      <div
        className="column p-0 is-2-desktop is-5-touch"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <figure
          className="image has-background-primary is-128x128"
          style={{ borderRadius: " 50%", overflow: "hidden" }}
        >
          {/* <img [src]="user.img" alt="" /> */}
        </figure>
      </div>
      <div className="column is-4-desktop">
        <div>
          <p className="title mb-0">{user}</p>
          <p className="is-size-5 mb-3">{status}</p>
          <p className="has-text-centered is-size-7-mobile">
            <span className="is-pulled-left">{posts.length} Posts</span>
            <span>{followers} Followers</span>
            <span className="is-pulled-right">{following} Following</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
