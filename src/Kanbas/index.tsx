import { Navigate, Route, Routes, useNavigate } from "react-router";
import KanbasNavigation from "./kanbasNavigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Account from "./Account";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";
import * as clientProfile from "../Users/client";

function Kanbas() {
  interface profileInterface {
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    dob : String,
    email : String,
    role : String,
    courses : any[]
  }
  const [coursesList, setCourses] = useState<any[]>([]);
  const [profile, setProfile] = useState<profileInterface>();
  const navigate = useNavigate();
  const COURSES_API = "https://kanbas-server-app-project.onrender.com/api/courses";

  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      coursesList.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };


  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(coursesList.filter(
      (c) => c._id !== courseId));
  };

  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([ ...coursesList, response.data ]);
  };
  // const findAllCourses = async () => {
  //   const response = profile?.courses
  //   setCourses(response.data);
  // };


  const [course, setCourse] = useState({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "aerodynamics.png"
  });
   return (
    <Provider store={store}>
     <div className="d-flex">
       <KanbasNavigation />
       <div style={{ flexGrow: 1 }}>
       <Routes>
          <Route path="/Account/*" element={<Account />} />
          <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={
              <Dashboard
              courses={(profile?.courses) || []}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>
            } />
            <Route path="Courses" element={<Navigate to="/Kanbas/Dashboard" />} />
            <Route
              path="Courses/:courseId/*"
              element={<Courses/>}
            />
        </Routes>

       </div>
     </div>
      </Provider>
   );
 }
 
 export default Kanbas;