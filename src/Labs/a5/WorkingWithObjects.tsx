import React, { useEffect, useState } from "react";
import axios from "axios";
function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
        });
        const ASSIGNMENT_URL = "https://kanbas-server-app-k7lj.onrender.com/a5/assignment"
    const [module, setModule] = useState({
        id: 1, name: "NodeJS Module",
        description: "Create a Module NodeJS server with ExpressJS",
        course : "CS572"
        });
        const Module_URL = "https://kanbas-server-app-k7lj.onrender.com/a5/module"
        const fetchAssignment = async () => {
            const response = await axios.get(`${ASSIGNMENT_URL}`);
            setAssignment(response.data);
          };
          const updateTitle = async () => {
            const response = await axios
              .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
            setAssignment(response.data);
          };
          useEffect(() => {
            fetchAssignment();
          }, []);
        
    return (
        <div>
        <h3>Working With Objects</h3>
        <h3>Modifying Properties</h3>
      <input className="form-control" onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button className="btn btn-primary mt-2" onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button className="btn btn-success ms-2 mt-2" onClick={fetchAssignment} >
        Fetch Assignment
      </button>
        <h4>Retrieving Objects</h4>
        <a className="btn btn-primary" href="https://kanbas-server-app-k7lj.onrender.com/a5/assignment">
            Get Assignment
        </a>
        <h4>Retrieving Properties</h4>
        <a className="btn btn-primary" href="https://kanbas-server-app-k7lj.onrender.com/a5/assignment/title">
            Get Title
        </a>
        <h4>Modifying Properties</h4>
        <div className="input-group">
        <input className="form-control" type="text" 
            onChange={(e) => setAssignment({ ...assignment,
                title: e.target.value })}
            value={assignment.title}/>
        <a className="btn btn-primary ms-2" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
            Update Title
        </a>
        </div>
        <div className="input-group mt-3">
        <input className="form-control" type="number"
            onChange={(e) => setAssignment({ ...assignment,
                score: parseInt(e.target.value )})}
            value={assignment.score}/>
        <a className="btn btn-primary ms-2" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
            Update Score
        </a>
        </div>
        <div className="form-check mt-3">
        <label className="form-check-label" htmlFor="completed">
        Completed
        </label>
            <input className="form-check-input" type="checkbox" id="completed"
                onChange={(e) => setAssignment({ ...assignment,
                    completed: e.target.checked })}
                checked={assignment.completed}/>
            <a className="btn btn-primary ms-2" href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
                Update Completed
            </a>
        </div>


        <h4>Retrieving Modules</h4>
        <a className="btn btn-primary" href="https://kanbas-server-app-k7lj.onrender.com/a5/module">
            Get Module
        </a>
        <h4>Retrieving Module Properties</h4>
        <a className="btn btn-primary" href="https://kanbas-server-app-k7lj.onrender.com/a5/module/name">
            Get Module Name
        </a>
        <h4>Modifying Module Properties</h4>
        <div className="input-group">
        <input className="form-control" type="text"
            onChange={(e) => setModule({ ...module,
                name: e.target.value })}
            value={module.name}/>
        <a className="btn btn-primary ms-2" href={`${Module_URL}/name/${module.name}`}>
            Update Module Name
        </a>
        </div>
        </div>
    );
    }
export default WorkingWithObjects;