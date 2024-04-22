import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";

function Kanbas() {
  const [course, setCourses] = useState<any[]>([]);
  const [course1, setCourse] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "fs.jpg",
  });
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course1);
    setCourses([...course, response.data]);
  };

  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );

    setCourses(course.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    const response = await axios.put(`${COURSES_API}/${course1._id}`,course1);

    setCourses(
      course.map((c) => {
        if (c._id === course1._id) {
          return course1;
        } else {
          return c;
        }
      })
    );
  };
  const API_BASE = process.env.REACT_APP_API_BASE
  const COURSES_API = `${API_BASE}/api/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
  
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  return (
    <Provider store={store}>
      <div className="d-flex">
        <KanbasNavigation />

        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <Dashboard
                  courses={course}
                  course={course1}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />

            <Route
              path="Courses/:courseId/*"
              element={<Courses/>}
            />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
            <Route path="Inbox" element={<h1>Inbox</h1>} />
            <Route path="History" element={<h1>History</h1>} />
            <Route path="Studio" element={<h1>Studio</h1>} />
            <Route path="Commons" element={<h1>Commons</h1>} />
            <Route path="Help" element={<h1>Help</h1>} />
            <Route path="Courses" element={<h1>Courses</h1>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
