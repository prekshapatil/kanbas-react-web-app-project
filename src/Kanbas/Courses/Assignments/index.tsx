import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { setAssignment, deleteAssignment, addAssignment, updateAssignment, setAssignments } from "./assignmentReducer";
import { useEffect } from "react";
import * as client from "./client";
function Assignments() {
  const intialAssignment =  {
    title: "New Assignment Title",
    course: "Assignment's Course",
    description: "New Description",
    points: "100",
    dueDate: "2023-09-18",
    availableFromDate: "2023-09-11",
    availableUntilDate: "2023-09-18",
  }

  const { courseId } = useParams();
  useEffect(() => {
    client.findAssignmentForCourse(courseId)
      .then((ass) =>
        dispatch(setAssignments(ass))
    );
  }, [courseId]);

  const handleAddAssignment = () => {
    client.createAssignment(courseId, assignment).then((ass) => {
      dispatch(addAssignment(ass));
    });
  };

  const handleUpdateAssignment = async () => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };


  const handleDeleteAssignment = (aid: string) => {
    client.deleteAssignment(aid).then(() => {
      dispatch(deleteAssignment(aid));
    });
  };
  const assignments = useSelector((state: KanbasState) => 
  state.assignmentsReducer.assignments);
  const assignment = useSelector((state: KanbasState) => 
  state.assignmentsReducer.assignment);
  const dispatch = useDispatch();
  return (
    <div className="wd-left-margin-10 me-5">
        <input
        className="form-control w-25 float-start"
        placeholder="Search for Assignment"/>

        <a href="#">
        <button type="submit" className="btn btn-light float-end">
        <i className="fa fa-ellipsis-v mt-1"></i>
        </button>
        </a>
        <Link to={`/Kanbas/Courses/${courseId}/Assignments/new`}>
        <button
        type="submit"
        className="btn btn-danger float-end me-1 wd-kanbas-save-profile btn-danger" onClick={() => dispatch(setAssignment(intialAssignment))}>
        <i className="fa fa-plus"></i>  
        <span className="wd-left-margin-10" >Assignment</span>
        </button>
        </Link>
        <a href="#">
        <button type="submit" className="btn btn-light float-end me-1">
        <i className="fa fa-plus"></i>
        <span className="wd-left-margin-10">Group</span>
        </button>
        </a>
        <br />
        <br/>
        <hr/>
        <br/>
            <>
            <ul className="list-group rounded-0">
            <li
            className="list-group-item list-group-item-secondary wd-kanbas-module-header-padding wd-kanbas-list-group-header">
            <div>
                <b>{'Assignment'}</b>
                <i className="fa fa-ellipsis-v float-end mt-1"></i>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/new`} className="wd-kanbas-no-underline wd-kanbas-black" onClick={() => dispatch(setAssignment(intialAssignment))}>
                <i className="fa fa-plus float-end mt-1 me-3"></i>
                </Link>
                <div
                className="border border-dark rounded-pill float-end me-3 wd-kanbas-assignment-total">
                40% of Total
                </div>
            </div>
            </li>
          <ul className="list-group">
            {assignments.filter((assign: { course: string | undefined; }) => assign.course === courseId).map((assig) => (
                <li className="list-group-item wd-kanbas-assignment-border">
                <div className=" ms-3">
                <i className="fa fa-pencil-square-o fa-2x float-start mt-3  mb-3 icon-front wd-kanbas-green"></i>
                <button
                    className="btn btn-danger float-end me-1 mt-1"
                    onClick={(e) => {
                      e.preventDefault();
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this assignment?"
                      );
                      if (confirmDelete) {
                        handleDeleteAssignment(assig._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                {/* <i className="fa fa-ellipsis-v float-end mt-4"></i> */}
                <i className="fa fa-check-circle float-end mt-3 me-3 wd-kanbas-green ps-5"></i>
                <div>
                        
                </div>
                <h4 className=" mt-1 mb-1">
                    <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assig._id}`} className="wd-kanbas-no-underline wd-kanbas-black" onClick={() => dispatch(setAssignment(assig))}>
                    {assig.title}
                    {console.log(assig)}
                    </Link>
                </h4>
                <div>
                    {assig.description}
                    <br/>
                    Due {assig.dueDate} at 11:59pm | {assig.points} points
                    </div>
                </div>
            </li>
            ))}
          </ul>
        </ul>
        <br />
        </>
    </ div>
);}
export default Assignments;