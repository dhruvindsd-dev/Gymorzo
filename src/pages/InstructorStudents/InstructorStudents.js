import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import useFetchWithCache from "../../Hooks/fetchWithCache";
import AssignWorkoutModal from "./AssignWorkoutModal/AssignWorkoutModal";
import NewStudentModal from "./NewStudentModal/NewStudentModal";
import StudentModal from "./StudentModal/StudentModal";

const InstructorStudents = (props) => {
  const [Students, isLoading] = useFetchWithCache(
    "/get-instructor-students",
    props.location.pathname
  );
  const [IsNewStudentOpen, setIsNewStudentOpen] = useState(false);
  const [SearchQuery, setSearchQuery] = useState("");
  const [
    AssignStudentWorkoutModalData,
    setAssignStudentWorkoutModalData,
  ] = useState({
    isModalOpen: false,
    username: "",
  });
  const [StudentModalData, setStudentModalData] = useState({
    isModalOpen: false,
    username: "",
    status: "",
    id: 0,
  });
  const handleInputChange = (evnt) => {
    setSearchQuery(evnt.target.value);
  };
  let students;
  if (isLoading) students = <Loader />;
  else if (Students.length > 0)
    students = (
      <div className="columns is-mobile is-multiline">
        {Students.filter(
          (item) =>
            item.username.toLowerCase().includes(SearchQuery) ||
            item.status.toLowerCase().includes(SearchQuery)
        ).map((item, i) => (
          <UserProfileCard
            key={i}
            username={item.username}
            status={item.status}
            click={setStudentModalData.bind(this, {
              isModalOpen: true,
              username: item.username,
              status: item.status,
              id: item.id,
            })}
          />
        ))}
      </div>
    );
  else students = <p className="title"> No Students Found</p>;
  return (
    <div className="section">
      {StudentModalData.isModalOpen && (
        <StudentModal
          name={StudentModalData.username}
          status={StudentModalData.status}
          id={StudentModalData.id}
          close={setStudentModalData.bind(this, {
            ...StudentModalData,
            isModalOpen: false,
          })}
          // close the profile modal and open the assign workouts to user modal
          handleAssignWorkoutsClick={() => {
            setStudentModalData({
              ...StudentModalData,
              isModalOpen: false,
            });
            setAssignStudentWorkoutModalData({
              username: StudentModalData.username,
              isModalOpen: true,
            });
          }}
        />
      )}
      {AssignStudentWorkoutModalData.isModalOpen && (
        <AssignWorkoutModal
          name={AssignStudentWorkoutModalData.username}
          closeModal={setAssignStudentWorkoutModalData.bind(this, {
            ...AssignStudentWorkoutModalData,
            isModalOpen: false,
          })}
        />
      )}
      {IsNewStudentOpen && (
        <NewStudentModal closeModal={setIsNewStudentOpen.bind(this, false)} />
      )}
      <div className="buttons is-centered">
        <button
          className="button is-link is-light is-outlined"
          onClick={setIsNewStudentOpen.bind(this, true)}
        >
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Add Student</span>
        </button>
      </div>
      <div className="is-size-4 has-text-weight-semibold">My Students</div>
      <div className="field my-4">
        <div className="control has-icons-left">
          <input
            type="text"
            className="input"
            placeholder="search students"
            onChange={handleInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
      {students}
    </div>
  );
};

export default InstructorStudents;
