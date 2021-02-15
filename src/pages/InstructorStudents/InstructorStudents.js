import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../App";
import Loader from "../../components/Loader/Loader";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import AssignWorkoutModal from "./AssignWorkoutModal/AssignWorkoutModal";
import NewStudentModal from "./NewStudentModal/NewStudentModal";
import StudentModal from "./StudentModal/StudentModal";

// 3 things
// * seach students and become their instructor
// * seach existing studnets and assingn workouts to em
// *

const InstructorStudents = (props) => {
  const [Students, setStudents] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
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
    name: "",
    status: "",
    id: 0,
  });
  useEffect(() => {
    AxiosInstance.get("/get-instructor-students").then((res) => {
      setStudents(res.data);
      setIsLoading(false);
    });
  }, [IsAddStudentModalOpen]);
  const handleInputChange = (evnt) => {
    setSearchQuery(evnt.target.value);
  };
  const handleStudentProfileModal = (name, status, id) => {
    setStudentModalData({
      isModalOpen: true,
      name: name,
      status: status,
      id: id,
    });
  };
  const handleAssignWorkoutToUser = () => {
    setStudentModalData({
      ...StudentModalData,
      isModalOpen: false,
    });
    setAssignStudentWorkoutModalData({
      ...AssignStudentWorkoutModalData,
      isModalOpen: true,
      username: StudentModalData.name,
    });
  };
  let students;
  if (IsLoading) students = <Loader />;
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
            click={handleStudentProfileModal.bind(
              this,
              item.username,
              item.status,
              item.id
            )}
          />
        ))}
      </div>
    );
  else students = <p className="title"> No Studnts Found</p>;

  return (
    <div className="section">
      {StudentModalData.isModalOpen && (
        <StudentModal
          name={StudentModalData.name}
          status={StudentModalData.status}
          id={StudentModalData.id}
          close={() => {
            setStudentModalData({
              ...StudentModalData,
              isModalOpen: false,
            });
          }}
          handleAssignWorkoutsClick={handleAssignWorkoutToUser}
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
      {IsAddStudentModalOpen && (
        <NewStudentModal
          closeModal={setIsAddStudentModalOpen.bind(this, false)}
        />
      )}
      <div className="buttons is-centered">
        <button
          className="button is-link is-light is-outline"
          onClick={setIsAddStudentModalOpen.bind(this, true)}
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
