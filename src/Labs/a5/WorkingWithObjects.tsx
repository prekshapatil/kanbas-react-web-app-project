import React, { useEffect, useState } from "react";
import axios from "axios";


const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
      });
      const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;

      const [module, setModule] = useState({
        id: 1, title: "NodeJS Assignment",
        name: "Create a NodeJS server with ExpressJS",
        description: "Create a NodeJS server with ExpressJS",
        course: "Web Dev", completed: false, score: 0,
      });
      const MODULE_URL = `${API_BASE}/a5/module`;

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
      <input onChange={(e) => setAssignment({
            ...assignment, title: e.target.value })}
        value={assignment.title} type="text" />
      <button onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button onClick={fetchAssignment} >
        Fetch Assignment
      </button>
      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment`}>
        Get Assignment
      </a>

      <h4>Retrieving Properties</h4>
      <a className="btn btn-primary" href={`${API_BASE}/a5/assignment/title`}>Get Title</a>

      <h4>Modifying Properties</h4>
      <a className="btn btn-primary" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input type="text" 
        onChange={(e) => setAssignment({ ...assignment,
            title: e.target.value })}
        value={assignment.title}/>

        <h4>Module</h4>
        <a className="btn btn-primary" href={`${API_BASE}/a5/module`}>
        Get Module
      </a>

      <h4>Retrieving Properties</h4>      
      <a className="btn btn-primary" href={`${API_BASE}/a5/module/name`}>Name</a>

      <h4>Modifying Properties</h4>

      <a className="btn btn-primary" href={`${MODULE_URL}/name/${module.name}`}>
        Update Module
      </a>
      <input type="text" 
        onChange={(e) => setModule({ ...module,
            name: e.target.value })}
        value={module.name}/>

<h4>Update Assignment Score</h4>
      <input
        type="number"
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
        value={assignment.score}
      />
      <a
        href={`${ASSIGNMENT_URL}/score/${assignment.score}`}
        className="btn btn-primary btn-sm ms-2"
      >
        Update Assignment Score
      </a>
      <h4>Update Assignment Completed</h4>
      <input
        type="checkbox"
        onChange={(e) =>
          setAssignment({ ...assignment, completed: !assignment.completed })
        }
      />
      <a
        href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}
        className="btn btn-primary btn-sm ms-2"
      >
        Update Assignment Completed
      </a>
      <h4>Update Module Description</h4>
      <input
        type="text"
        onChange={(e) => setModule({ ...module, description: e.target.value })}
        value={module.description}
      />
      <a
        href={`${MODULE_URL}/description/${module.description}`}
        className="btn btn-primary btn-sm ms-2"
      >
        Update Module Description
      </a>     
    </div>
  );
}
export default WorkingWithObjects;
