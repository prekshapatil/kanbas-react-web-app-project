import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import GradesEntry from "./gradesEntry";
function Grades() {
  const { courseId } = useParams();
  const as = assignments.find((type) => type.type === "Assignments")?.value.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div className="wd-kanbas-column-right-margin me-5">
        <a href="#">
            <button type="submit" className="btn btn-light float-end">
            <i className="fa fa-gear mt-1"></i>
            </button>
        </a>
        <a href="#">
            <button type="submit" className="btn btn-light float-end me-1">
            <i className="fa fa-cloud-download" aria-hidden="true"></i>
            <span className="wd-left-margin-10">Export</span>
            <i className="fa fa-angle-down"></i>
            </button>
        </a>
        <a href="#">
            <button type="submit" className="btn btn-light float-end me-1">
            <i className="fa fa-cloud-upload" aria-hidden="true"></i>
            <span className="wd-left-margin-10">Import</span>
            </button>
        </a>
        <a href="#" className=" float-start wd-kanbas-hyperlink">
            <h4>             <span className="wd-left-margin-10">Gradebook</span>
            <i className="fa fa-sort-desc ms-3" aria-hidden="true"></i></h4>
        </a>
        <br />
        <br />

        <div>
            <div className="row mb-2">
            <div className="col-6 float-start wd-kanbad-margin-right-left">
                <b>Student Names</b>
            </div>
            <div className="col-6 float-start wd-kanbad-margin-right-left">
                <b>Assignment Names</b>
            </div>
            </div>
            <div className="row">
            <div className="col">
                <input className="form-control" placeholder="Search Students" />
            </div>
            <div className="col">
                <input className="form-control" placeholder="Search Assignments" />
            </div>
            </div>
        </div>
    
        <a href="#">
            <button type="submit" className="btn btn-light float-start mt-2">
            <i className="fa fa-filter mt-1 me-1"></i>
            Apply Filters
            </button>
        </a>
    
        <br />
        <br />
      <div className="table-responsive mt-2">
        <table className="table table-striped border rounded">
          <thead>
            <th className="wd-kanbas-center-heading wd-kanbas-table-border">Student Name</th>
            {as!.map((assignment) => (<th className="wd-kanbas-center-heading wd-kanbas-table-border">{assignment.title} <br />(Out of 100)</th>))}
          </thead>


          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                   <td> <a href="#" className="wd-kanbas-hyperlink"> {user?.firstName} {user?.lastName} </a></td>
                   {as!.map((assignment, index) => {
                     const grade = grades.find(
                       (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                       return (grade?.student === "126" && index === 1?<GradesEntry gradeValue={grade?.grade!} /> :  <td className="wd-kanbas-center-heading wd-kanbas-table-border">{grade?.grade + "%" || ""}</td>);
                       })}
                </tr>);
            })}
          </tbody></table>
      </div></div>);
}
export default Grades;

