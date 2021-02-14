import React, { useState } from "react";
import { AxiosInstance } from "../../../../../App";

const SearchedUserListItem = ({ username, status, id, actionType }) => {
  // using btn text for loading, if btntext === '' then btn loading else show text
  const [BtnText, setBtnText] = useState(actionType);
  const handleSendFollowRequest = () => {
    const formData = new FormData();
    formData.append("userToRequestId", id);
    setBtnText("");
    let action;
    if (BtnText === "follow") action = "follow";
    // do the opposite ie if the user is following someone  then unfollow on tap, and if he has requested then remove follow request
    else if (BtnText === "requested") action = "removeFollowRequest";
    else if (BtnText === "following") action = "unfollow";

    AxiosInstance.put(`/user-social-actions/${action}`, formData).then(
      (res) => {
        if (action === "unfollow" || action === "removeFollowRequest")
          setBtnText("follow");
        else if (action === "follow") setBtnText("requested");
      }
    );
  };
  return (
    <div className="columns my-4 is-mobile has-background-light">
      <div
        className="column p-0 is-2"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <figure
          className="image is-48x48 has-background-primary"
          style={{
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {/* <img [src]="user.img" alt="" /> */}
        </figure>
      </div>
      <div className="column">
        <div>
          <p className="is-size-6-touch is-size-5-desktop has-text-weight-medium">
            {username}
          </p>
          <p className="is-size-7 ">{status}</p>
        </div>
      </div>
      <div
        className="column has-text-right is-3 center-vertically "
        style={{ justifyContent: "flex-end" }}
      >
        <button
          onClick={handleSendFollowRequest}
          className={
            "button is-link is-light is-outlined is-small " +
            (!!!BtnText && "is-loading")
          }
        >
          {BtnText}
        </button>
      </div>
    </div>
  );
};

export default SearchedUserListItem;
