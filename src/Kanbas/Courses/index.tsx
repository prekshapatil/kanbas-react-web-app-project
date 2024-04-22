import { courses } from "../../Kanbas/Database";
import {
  useParams,
  Link,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import "./index.css";
import Modules from "./Modules";
import StudentView from "./StudentView";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuestionEditor from "./Quizzes/QuizEditor/Questions/QuestionEditor";
import Quizzes from "./Quizzes";
import Details from "./Quizzes/QuizEditor/Details";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizDetail from "./Quizzes/QuizDetail";

function Courses() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const API_BASE = process.env.REACT_APP_API_BASE

  const COURSES_API = `${API_BASE}/api/courses`;
  const [course, setCourse] = useState<any>({ _id: "", number: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

  const [slash, kanbas, cour, id, screen, p, quiz] = pathname.split("/");
  console.log(pathname);
  let isAssignmentScreen = false;
  let isQuizScreen = false;
  if (screen === 'Assignments') {
    isAssignmentScreen = p ? true : false;
  }
  if (screen === 'Quizzes') {
    isQuizScreen = p ? true : false;
  }
  
  //const isQuizScreen = quiz ? true : false;
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  //const course = courses.find((course) => course._id === courseId);
  const isStudentView = screen === "Home" || screen === "Modules" || screen == "Quizzes";

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex wd-nav-div-margin">
          <h5>
            <HiMiniBars3 color="red" />{" "}
          </h5>

          <nav className="wd-nav-style" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item wd-top-bar">
                <Link
                  style={{
                    marginTop: "3px",
                    marginLeft: "2px",
                    textDecoration: "none",
                    paddingTop: "10px",
                    color: "red",
                  }}
                  to={`/Kanbas/Courses/${courseId}/Home`}
                >
                  {course?.number}{" "}
                </Link>
              </li>
              {isAssignmentScreen ? (
      <>
        <li className="breadcrumb-item wd-top-bar">
          <Link
            style={{
              marginTop: "3px",
              marginLeft: "2px",
              textDecoration: "none",
              paddingTop: "10px",
              color: "red",
            }}
            to={`/Kanbas/Courses/${courseId}/Assignments`}
          >
            Assignments{" "}
          </Link>
        </li>
        <li className="breadcrumb-item wd-top-bar">{p}</li>
      </>
    ) : isQuizScreen ? (
      <>
        <li className="breadcrumb-item wd-top-bar">
          <Link
            style={{
              marginTop: "3px",
              marginLeft: "2px",
              textDecoration: "none",
              paddingTop: "10px",
              color: "red",
            }}
            to={`/Kanbas/Courses/${courseId}/Quizzes`}
          >
            Quizzes{" "}
          </Link>
        </li>
        <li className="breadcrumb-item wd-top-bar">{p}</li>
      </>
    ) : (
      <li className="breadcrumb-item active wd-top-bar-text">
        {decodeURIComponent(screen)}
      </li>
    )}
            </ol>
          </nav>
        </div>

        {isStudentView && <StudentView />}
      </div>
      <hr />
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "70px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<Grades />} />
            <Route path="Zoom Meetings" element={<h1>Zoom Meetings</h1>} />
            <Route path="Quizzes" element={<Quiz />} />
            <Route path="Quizzes/:quizId/QuizEditor/*" element={<QuizEditor/>} />
            <Route path="Quizzes/:quizId/QuizEditor/questions/:questionId" element={<QuestionEditor/>} />
            <Route path="Quizzes/:quizId" element={<QuizDetail/>} />
            <Route path="Quizzes/:quizId/QuizPreview" element={<QuizPreview/>} />
            <Route path="People" element={<h1>People</h1>} />
            <Route path="Panopto Video" element={<h1>Panopto Video</h1>} />
            <Route path="Pages" element={<h1>Pages</h1>} />
            <Route path="Files" element={<h1>Files</h1>} />
            <Route path="Rubrics" element={<h1>Rubrics</h1>} />
            <Route path="Outcomes" element={<h1>Outcomes</h1>} />
            <Route path="Collaborations" element={<h1>Collaborations</h1>} />
            <Route path="Syllabus" element={<h1>Syllabus</h1>} />
            <Route path="Settings" element={<h1>Settings</h1>} />
            <Route path="Discussions" element={<h1>Discussions</h1>} />
            <Route path="Announcements" element={<h1>Announcements</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default Courses;
