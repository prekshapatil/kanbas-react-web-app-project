import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import BreadcrumbTop from "./Breadcrumbs";
import CompressedNav from "./Navigation/compressedNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizEditor from "./Quizzes/Editor/details";
import Questions from "./Quizzes/Editor/questions";
import PreviewQuiz from "./Quizzes/Preview";
import Question from "./Questions";
function Courses() {
  const { courseId } = useParams();
  const COURSES_API = "https://kanbas-server-app-project.onrender.com/api/courses";
  const [course, setCourse] = useState<any>({ id: courseId });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);
  return (
    <>
        <CompressedNav />
        <div className="wd-left-margin-100 me-5 d-none d-md-block">
            <div className="d-flex">
                <span className="wd-kanbas-hyperlink"><h2><HiMiniBars3 /></h2></span>
                <span className="wd-left-margin-20 mt-2"><h4><BreadcrumbTop  courseId = {courseId!} courseName={course?.name!}/></h4></span>
            </div>
            <hr />
        </div>
        <div className="d-flex">
        <CourseNavigation />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home/>} />
            <Route path="Modules" element={<Modules/>} />
            <Route path="Assignments" element={<Assignments/>} />
            <Route path="Quizzes" element={<Quizzes/>} />
            <Route path="Quizzes/:quizId" element={<QuizDetails/>} />
            <Route path="Quizzes/:quizId/edit" element={<QuizEditor/>} />
            <Route path="Quizzes/:quizId/questions" element={<Questions/>} />
            <Route path="Quizzes/:quizId/Preview/:qIndex" element={<PreviewQuiz/>} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor/>}/>
            <Route path="Quizzes/:quizId/Question/:id" element={<Question/>}/>
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
    </div>
    </>
);}

export default Courses;