import React, { useEffect, useState } from "react";
import "../../kanbasCSS/style.css";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    client.findModulesForCourse(courseId)
      .then((modules) =>
        dispatch(setModules(modules))
    );
  }, [courseId]);

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };


  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };
  

  const moduleList = useSelector((state: KanbasState) => 
  state.modulesReducer.modules);
  const module = useSelector((state: KanbasState) => 
  state.modulesReducer.module);
  const dispatch = useDispatch();
  const modulesList = moduleList.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);
  return (
    <>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
            <button type="button" className="btn btn-light">Collapse All</button>
            <button type="button" className="btn btn-light">View Progress</button>
            <button type="button" className="btn btn-light"><i className="fa fa-check" aria-hidden="true" style={{"color" : "green", "marginRight": "3px"}}></i>Publish All</button>
            <button type="button" className="btn btn-danger"><i className="fa fa-plus" aria-hidden="true" style={{"marginRight": "3px"}}></i>Module</button>
            <button type="button" className="btn btn-light"><i className="fa fa-ellipsis-v ms-2"></i></button>
        </div>
        <hr />
        <ul className="list-group">
        <li
          className="list-group-item"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          <input
            className="form-control me-2"
            value={module.name}
            onChange={(e) =>
              dispatch(setModule({ ...module, name: e.target.value }))
            }
          />
          <textarea
            className="form-control me-2"
            style={{ height: "2rem" }}
            value={module.description}
            onChange={(e) =>
              dispatch(setModule({ ...module, description: e.target.value }))
            }
          />
          <button
            className="btn btn-primary me-2"
            onClick={handleUpdateModule}
          >
            Update
          </button>

          <button
            className="btn btn-success me-2"
            onClick={handleAddModule}
          >
            Add
          </button>
        </li>
      </ul>
      <ul className="list-group wd-modules mt-5">
        {modulesList.map((module, index) => (
          <li key={index}
            className="list-group-item wd-kanbas-assignment-border" style={{"padding":"0px", "borderRadius":"0px"}}
            onClick={() => setSelectedModule(module)}>
            <div className="wd-kanbas-list-group-header">
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success me-2" />
                <button
                className="btn btn-danger float-end "
                onClick={() => handleDeleteModule(module._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary float-end me-2"
                onClick={() => dispatch(setModule(module))}
              >
                Edit
              </button>
              </span>
            </div>
            {selectedModule !== undefined && selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson: any, index: any) => (
                  <li className="list-group-item" style={{ "borderRadius":"0px"}} key={index}>
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;