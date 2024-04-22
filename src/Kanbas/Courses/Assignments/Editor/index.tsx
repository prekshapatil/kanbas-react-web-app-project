import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  setAssignment,
  clearAssignment,
  updateAssignment,
} from "../reducer";
import { KanbasState } from "../../../store";
import * as service from "../service";

function AssignmentEditor() {
  const { assignmentId } = useParams();
  //   const assignment = assignments.find(
  //     (assignment) => assignment._id === assignmentId
  //   );
  const isAddNew = assignmentId === "AssignmentEditor";

  const { courseId } = useParams();
  const navigate = useNavigate();
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentReducer.assignment
  );
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    if (isAddNew) {
      handleAddingNew();
    } else {
      handleUpdate();
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  const dispatch = useDispatch();

  const handleAddingNew = () => {
    service
      .createAssignment(courseId, assignment)
      .then((a) => dispatch(addAssignment(a)));
  };

  const handleUpdate = async () => {
    const res = await service.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  return (
    <div>
      <h2>Assignment Name</h2>
      <input
        value={assignment?.title}
        className="form-control mb-2"
        onChange={(e) => {
          dispatch(setAssignment({ ...assignment, title: e.target.value }));
        }}
      />
      <textarea
        value={assignment.description}
        className="form-control mb-2"
        onChange={(e) => {
          dispatch(
            setAssignment({ ...assignment, description: e.target.value })
          );
        }}
      />
      <br />
      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          Points
        </div>
        <div className="col-sm-6 col-md-8 w-50">
          <input
            className="form-control"
            type="number"
            placeholder="Points"
            aria-label="default input example"
            value={assignment?.points}
            onChange={(e) =>
              dispatch(setAssignment({ ...assignment, points: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="row g-0 text-end">
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          Assign
        </div>
        <div className="col-sm-6 col-md-8 w-50" style={{ textAlign: "start" }}>
          <div
            className="wd-group"
            style={{
              border: "0.5px solid black",
              borderRadius: "1%",
              padding: "10px",
            }}
          >
            <b>Assign to</b>
            <input
              className="form-control"
              type="text"
              placeholder="Choose"
              value="Everyone"
              aria-label="default input example"
            />
            <br />
            <b>Due</b>
            <input
              className="form-control"
              type="datetime-local"
              value={assignment?.dueDateTime}
              onChange={(e) => {
                dispatch(
                  setAssignment({ ...assignment, dueDateTime: e.target.value })
                );
              }}
            />

            <br />
            <div
              className="wd-flex-row-container"
              style={{
                width: "-webkit-fill-available",
                justifyContent: "space-around",
              }}
            >
              <div className="row">
                <div className="col">
                  <b>Available from </b>
                </div>
                <div className="col">
                  <b>Until </b>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <input
                    className="form-control w-75"
                    type="datetime-local"
                    value={assignment?.availableFromDate}
                    onChange={(e) =>
                      dispatch(
                        setAssignment({
                          ...assignment,
                          availableFromDate: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control w-75"
                    type="datetime-local"
                    value={assignment?.availableUntilDate}
                    onChange={(e) =>
                      dispatch(
                        setAssignment({
                          ...assignment,
                          availableUntilDate: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSave} className="btn btn-success ms-2 float-end">
        Save
      </button>
      <Link
        onClick={(e) => dispatch(clearAssignment())}
        to={`/Kanbas/Courses/${courseId}/Assignments`}
        className="btn btn-danger float-end"
      >
        Cancel
      </Link>
    </div>
  );
}
export default AssignmentEditor;
