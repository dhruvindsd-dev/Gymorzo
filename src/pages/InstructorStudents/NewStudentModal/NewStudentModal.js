import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../../App";
import Loader from "../../../components/Loader/Loader";
import StudentCard from "./StudentCard/StudentCard";

const NewStudentModal = ({ closeModal }) => {
  const [Students, setStudents] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AxiosInstance.get("get-students-without-instructors").then((res) => {
      setStudents(res.data);
      setIsLoading(false);
    });
  }, []);
  let students;
  if (IsLoading) students = <Loader />;
  else if (!!Students.length)
    students = Students.map((item, i) => (
      <StudentCard
        name={item.username}
        status={item.status}
        // click={() => {
        // }}
        closeModal={closeModal}
        id={item.id}
      />
    ));
  else students = <p className="is-size-4">No Students Found</p>;
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title has-text-weight-semibold">
            New Student
          </p>
          <button className="delete" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body pt-0">
          <div
            className="has-background-light pt-3"
            style={{ position: "sticky", top: "0px", zIndex: 100 }}
          >
            <div className="field">
              <div className="control has-icons-left">
                <input
                  type="text"
                  className="input"
                  placeholder="search students"
                />
                <span className="icon is-left">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <p className="is-size-5 my-2">Students</p>
          {students}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-link" onClick={closeModal}>
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NewStudentModal;
