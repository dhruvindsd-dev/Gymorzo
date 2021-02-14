import React, { useState } from "react";
import { AxiosInstance } from "../../../../App";

const StudentCard = ({ name, status, id, closeModal }) => {
  const [IsLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("userId", id);
    setIsLoading(true);
    AxiosInstance.put("/assign-instructor-to-student", formData).then((res) => {
      closeModal();
    });
  };
  return (
    <div className="my-3 px-2">
      <div className="columns is-mobile mb-0 is-marginless">
        <div className="column p-0 is-8">
          <p className="has-text-weight-semibold is-size-5">{name}</p>
          <p className=" l-opacity">{status}</p>
        </div>
        <div className="column p-0 is-4 has-text-right center-vertically">
          <button
            onClick={handleSubmit}
            className={"button is-link " + (IsLoading ? "is-loading" : "")}
          >
            become instructor
          </button>
        </div>
      </div>
      <hr className="my-0" />
    </div>
  );
};

export default StudentCard;
