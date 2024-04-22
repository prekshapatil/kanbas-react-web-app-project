import React, { useState, useEffect } from "react";
import "./index.css";
import { modules } from "../../Database";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaBan,
  FaBell,
  FaCalendarCheck,
  FaCaretRight,
  FaChartBar,
  FaCrosshairs,
  FaEllipsisH,
  FaFileImport,
  FaNewspaper,
  FaPlus,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";

import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();

  useEffect(() => {
    client.findModulesForCourse(courseId).then((modules) =>
      dispatch(setModules(modules))
    );
  }, [courseId]);

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };



  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  return (
    <div className="flex-fill">
      <div className="d-flex justify-content-end">
        <Link
          to={"#"}
          className="btn btn-secondary btn-sm wd-button wd-btn-color"
        >
          Collapse All
        </Link>

        <Link
          to={"#"}
          className="wd-btn-color btn btn-secondary btn-sm wd-button"
          role="button"
        >
          View Progress
        </Link>

        <div className="dropdown">
          <Link
            to={"#"}
            className="btn btn-secondary btn-sm dropdown-toggle wd-button wd-btn-color"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
          >
            <FaCheckCircle />
            Publish All
          </Link>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <Link to={"#"} className="dropdown-item">
                None
              </Link>
            </li>
          </ul>
        </div>

        <Link to={"#"} className="btn btn-danger btn-sm" role="button">
          <FaPlus />
          Modules
        </Link>

        <Link
          to={"#"}
          className="btn btn-secondary btn-sm wd-button wd-btn-color"
          role="button"
        >
          <FaEllipsisV />
        </Link>
      </div>
      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div className="d-flex">
            <div>
              <input
                value={module.name}
                className="form-group"
                onChange={(e) =>
                  dispatch(setModule({ ...module, name: e.target.value }))
                }
              />
            </div>
            <div style={{ marginLeft: "5px" }}>
              <button
                className="btn btn-danger btn-sm me-1"
                onClick={handleAddModule
                }
              >
                Add
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleUpdateModule}
              >
                Update
              </button>
            </div>
          </div>
          <div className="ml-2">
            <textarea
              value={module.description}
              className="form-group"
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            />
          </div>
        </li>

        {moduleList
          .filter((module) => module?.course === courseId)

          .map((module, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button
                    style={{
                      marginRight: "5px",
                      backgroundColor: "red",
                      borderRadius: "3px",
                      width: "55px",
                      color: "white",
                    }}
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>

                  <button
                    style={{
                      marginRight: "5px",
                      backgroundColor: "green",
                      borderRadius: "3px",
                      width: "55px",
                      color: "white",
                    }}
                    onClick={() => dispatch(setModule(module))}
                  >
                    Edit
                  </button>

                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule?._id === module?._id && (
                <ul className="list-group">
                  {module.lessons?.map(
                    (lesson: {
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <li className="list-group-item">
                        <FaEllipsisV className="me-2" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ModuleList;
