import React from "react";
import profileImg from "../../assets/img/userprofile.webp";
const UserProfileCard = ({ username, status, click }) => {
  return (
    <div
      className="column is-3-desktop is-6-touch is-clickable"
      onClick={click}
    >
      <div
        style={{
          backgroundImage: "url(" + profileImg + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          className="p-3 black-gradient"
          style={{ backgroundColor: "transparent" }}
        >
          <br />
          <br />
          <br />
          <p className="is-size-5 has-text-weight-semibold has-text-light">
            {username}
          </p>
          <p className="has-text-light">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
