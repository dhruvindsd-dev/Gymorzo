import React from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "../../../App";
import profile from "../../../assets/img/userprofile.jpg";
const StudentModal = ({
  name,
  status,
  close,
  id,
  handleAssignWorkoutsClick,
}) => {
  const handleRemoveStudent = () => {
    const formData = new FormData();
    formData.append("userId", id);
    AxiosInstance.delete("/remove-student", {
      params: {
        userId: id,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={close}></div>
      <div className="model-content">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={profile} alt="" />
            </figure>
          </div>
          <div className="card-content">
            <p className="is-size-4">{name}</p>
            <p>{status}</p>
            <div className="buttons mt-3 ">
              <button
                className="button is-link is-light"
                onClick={handleAssignWorkoutsClick}
              >
                Assign Workouts
              </button>
              <Link to={`/profile/${name}`} className="button is-link is-light">
                View Profile
              </Link>
              <button
                onClick={handleRemoveStudent}
                className="button is-danger is-light"
              >
                Remove Student
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" onClick={close}></button>
    </div>
  );
};

export default StudentModal;
