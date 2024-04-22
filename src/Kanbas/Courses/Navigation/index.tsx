import { Link, useLocation } from "react-router-dom";
import "../../kanbasCSS/style.css";
import "./index.css";
function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Grades", "Assignments", "Zoom", "Quizzes", "People", "Pages", "Announcements", "Files", "Rubrics", "Outcomes", "Collaborations","Questions", "Syllabus", "Settings"];
  const { pathname } = useLocation();
  return (
    <ul className="wd-navigation">
    <span className="wd-course-nav-header">202410_1 Fall 2023 Semest...</span>
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>
  );
}
export default CourseNavigation;