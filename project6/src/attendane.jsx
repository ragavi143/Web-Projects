import React, { useState } from "react";
import "./App.css";

function Attendance() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ragavi", status: "Present" },
    { id: 2, name: "Anu", status: "Absent" },
    { id: 3, name: "Kavin", status: "Present" },
    { id: 4, name: "Priya", status: "Absent" },
    { id: 5, name: "Arun", status: "Present" },
    { id: 6, name: "Divya", status: "Absent" },
    { id: 7, name: "Vijay", status: "Present" },
    { id: 8, name: "Sowmiya", status: "Absent" },
    { id: 9, name: "KarthiRaj", status: "Present" },
    { id: 10, name: "Ramesh", status: "Absent" }
  ]);

  // Change attendance status
  const markAttendance = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: status }
          : student
      )
    );
  };

  // Count present and absent students
  const presentCount = students.filter(
    (student) => student.status === "Present"
  ).length;

  const absentCount = students.filter(
    (student) => student.status === "Absent"
  ).length;

  return (
    <div className="container">
      <h1>Student Attendance Tracker</h1>

      <div className="summary">
        <div className="card present">
          <h2>{presentCount}</h2>
          <p>Present</p>
        </div>

        <div className="card absent">
          <h2>{absentCount}</h2>
          <p>Absent</p>
        </div>
      </div>

      <div className="student-list">
        <h2>Student List</h2>

        {students.map((student) => (
          <div className="student" key={student.id}>
            <div>
              <h3>{student.name}</h3>
              <p>
                Status:
                <span className={student.status.toLowerCase()}>
                  {" "}{student.status}
                </span>
              </p>
            </div>

            <div className="buttons">
              <button
                className="present-btn"
                onClick={() =>
                  markAttendance(student.id, "Present")
                }
              >
                Present
              </button>

              <button
                className="absent-btn"
                onClick={() =>
                  markAttendance(student.id, "Absent")
                }
              >
                Absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;