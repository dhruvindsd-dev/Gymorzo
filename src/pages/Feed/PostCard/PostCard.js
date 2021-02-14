import React from "react";
import tempImg from "../../../assets/img/userprofile.webp";
const PostCard = (props) => {
  const { username, caption, date } = props;
  let img = (
    <figure className="image is-square has-background-primary">
      <img src={tempImg} alt="" />
    </figure>
  );
  if ((username && caption && date) === undefined) {
    return img;
  }
  return (
    <>
      <div
        className="card"
        style={{
          border: "1px solid grey",
          boxShadow: "3px 3px rgba(136, 134, 134, 0.466)",
        }}
      >
        <div className="card-image">{img}</div>
        <div className="card-content has-background-light p-2">
          <p className=" is-size-5">{caption}</p>
          <span className=" is-size-6 l-opacity">{username}</span>
          <span className="is-size-6 l-opacity is-pulled-right">{date}</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default PostCard;
