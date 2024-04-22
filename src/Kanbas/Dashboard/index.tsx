import React, { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const handleCourseUpdate = (course: any) => {
    if (course !== null) {
      console.log("hi");
      if (course.startDate && course.startDate !== "") {
        course.startDate = new Date(course.startDate)
          .toISOString()
          .split("T")[0];
      }
      if (course.endDate && course.endDate !== "") {
        course.endDate = new Date(course.endDate).toISOString().split("T")[0];
      }
    }
    setCourse(course);
  };

  return (
    <div className="p-4">
      <h1>Dashboard</h1> <hr />
      <h2>Published Courses ({courses.length})</h2> <hr />
      <input
        value={course.name}
        className="form-control"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        value={course.number}
        className="form-control"
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
      />
      <input
        value={course.startDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
      />
      <input
        value={course.endDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
      />
      <button onClick={addNewCourse} className="btn btn-danger btn-sm">
        Add
      </button>
      <button onClick={updateCourse} className="btn btn-primary btn-sm">
        Update
      </button>
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img
                  src={`/images/${course.image}`}
                  className="card-img-top"
                  style={{ height: 150 }}
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course.id}/Home`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}{" "}
                  </Link>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleCourseUpdate(course);
                    }}
                    className="btn btn-success btn-sm"
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}
                  >
                    Delete
                  </button>

                  <p className="card-text">{course.name}</p>
                  <Link
                    to={`/Kanbas/Courses/${course.id}/Home`}
                    className="btn btn-primary"
                  >
                    Go{" "}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
